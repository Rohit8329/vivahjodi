package com.vivahjodi.profile.review;

import com.fasterxml.jackson.databind.JsonNode;
import java.util.Iterator;
import java.util.Objects;
import java.util.UUID;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vivahjodi.profile.Profile;
import com.vivahjodi.profile.education.EducationDetailRepository;
import com.vivahjodi.profile.family.FamilyDetailRepository;
import com.vivahjodi.profile.occupation.OccupationDetailRepository;
import com.vivahjodi.profile.relative.RelativeRepository;
import com.vivahjodi.profile.ProfilePhotoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.beans.Introspector;
import java.lang.reflect.Method;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ProfileReviewSnapshotService {

    private final ProfileReviewSnapshotRepository snapshotRepository;
    private final EducationDetailRepository educationRepository;
    private final FamilyDetailRepository familyRepository;
    private final OccupationDetailRepository occupationRepository;
    private final RelativeRepository relativeRepository;
    private final ProfilePhotoRepository photoRepository;
    private final ObjectMapper objectMapper;

    public ProfileReviewSnapshotService(
            ProfileReviewSnapshotRepository snapshotRepository,
            EducationDetailRepository educationRepository,
            FamilyDetailRepository familyRepository,
            OccupationDetailRepository occupationRepository,
            RelativeRepository relativeRepository,
            ProfilePhotoRepository photoRepository,
            ObjectMapper objectMapper) {

        this.snapshotRepository = snapshotRepository;
        this.educationRepository = educationRepository;
        this.familyRepository = familyRepository;
        this.occupationRepository = occupationRepository;
        this.relativeRepository = relativeRepository;
        this.photoRepository = photoRepository;
        this.objectMapper = objectMapper;
    }

    /**
 * Preserve the original version before the first edit
 * in a review cycle. Repeated edits keep that baseline.
 */
@Transactional
public void captureBeforeChange(Profile profile) {
    ProfileReviewSnapshot snapshot =
            snapshotRepository.findByProfileId(profile.getId())
                    .orElse(null);

    // Start a fresh review cycle when the previous one
    // has no proposed version.
    if (snapshot != null && snapshot.getProposedJson() == null) {
        return;
    }

    if (snapshot == null) {
        snapshot = new ProfileReviewSnapshot();
        OffsetDateTime now = OffsetDateTime.now();

        snapshot.setProfile(profile);
        snapshot.setCreatedAt(now);
        snapshot.setUpdatedAt(now);
    }

    snapshot.setBaselineJson(serializeCurrentProfile(profile));
    snapshot.setProposedJson(null);
    snapshot.setUpdatedAt(OffsetDateTime.now());

    snapshotRepository.save(snapshot);
}

    /**
     * Store the complete current version when the profile
     * is submitted for admin review.
     */
    @Transactional
    public void captureProposedVersion(Profile profile) {
        ProfileReviewSnapshot snapshot =
                snapshotRepository.findByProfileId(profile.getId())
                        .orElseGet(() -> {
                            ProfileReviewSnapshot created =
                                    new ProfileReviewSnapshot();

                            OffsetDateTime now = OffsetDateTime.now();
                            created.setProfile(profile);
                            created.setBaselineJson(
                                    serializeCurrentProfile(profile));
                            created.setCreatedAt(now);
                            created.setUpdatedAt(now);

                            return created;
                        });

        snapshot.setProposedJson(serializeCurrentProfile(profile));
        snapshot.setUpdatedAt(OffsetDateTime.now());

        snapshotRepository.save(snapshot);
    }


/**
 * Finish the current review cycle and prepare the snapshot
 * for the next cycle.
 */
@Transactional
public void finishReviewCycle(Profile profile) {
    ProfileReviewSnapshot snapshot =
            snapshotRepository.findByProfileId(profile.getId())
                    .orElse(null);

    if (snapshot == null) {
        return;
    }

    // The persisted profile is now the starting point
    // for any future edits.
    snapshot.setBaselineJson(serializeCurrentProfile(profile));
    snapshot.setProposedJson(null);
    snapshot.setUpdatedAt(OffsetDateTime.now());

    snapshotRepository.save(snapshot);
}


    @Transactional(readOnly = true)
public List<ProfileFieldChange> getChanges(UUID profileId) {
   Optional<ProfileReviewSnapshot> snapshotOptional =
        snapshotRepository.findByProfileId(profileId);

if (snapshotOptional.isEmpty()) {
    return List.of();
}

ProfileReviewSnapshot snapshot = snapshotOptional.get();

    if (snapshot.getBaselineJson() == null
            || snapshot.getProposedJson() == null) {
        return List.of();
    }

    try {
        JsonNode oldRoot =
                objectMapper.readTree(snapshot.getBaselineJson());
        JsonNode newRoot =
                objectMapper.readTree(snapshot.getProposedJson());

        List<ProfileFieldChange> changes = new ArrayList<>();
        compareNodes("", oldRoot, newRoot, changes);
        return changes;

    } catch (Exception exception) {
        throw new IllegalStateException(
                "Unable to compare profile review snapshots",
                exception);
    }
}


private void compareNodes(
        String path,
        JsonNode oldNode,
        JsonNode newNode,
        List<ProfileFieldChange> changes) {

    if (Objects.equals(oldNode, newNode)) {
        return;
    }

    if (oldNode != null && newNode != null
            && oldNode.isObject() && newNode.isObject()) {

        Iterator<String> names = newNode.fieldNames();

        while (names.hasNext()) {
            String name = names.next();

            if (isInternalField(name)) {
                continue;
            }

            compareNodes(
                    path.isEmpty() ? name : path + "." + name,
                    oldNode.get(name),
                    newNode.get(name),
                    changes);
        }

        Iterator<String> oldNames = oldNode.fieldNames();

        while (oldNames.hasNext()) {
            String name = oldNames.next();

            if (isInternalField(name) || newNode.has(name)) {
                continue;
            }

            compareNodes(
                    path.isEmpty() ? name : path + "." + name,
                    oldNode.get(name),
                    null,
                    changes);
        }

        return;
    }

    if (oldNode != null && newNode != null
            && oldNode.isArray() && newNode.isArray()) {

        compareArrayRecords(path, oldNode, newNode, changes);
        return;
    }

    // Never display photo storage paths in the admin change list.
    if (path.toLowerCase().contains("storagepath")) {
        return;
    }

    String[] parts = path.split("\\.");
    String section = parts.length > 1 ? parts[0] : "profile";
    String field = parts.length > 1
            ? String.join(".", java.util.Arrays.copyOfRange(
                    parts, 1, parts.length))
            : path;

    changes.add(new ProfileFieldChange(
            section,
            field,
            displayChangeValue(oldNode),
            displayChangeValue(newNode)));
}

private void compareArrayRecords(
        String path,
        JsonNode oldArray,
        JsonNode newArray,
        List<ProfileFieldChange> changes) {

    Map<String, JsonNode> oldRecords = new LinkedHashMap<>();
    Map<String, JsonNode> newRecords = new LinkedHashMap<>();

    boolean recordsHaveIds = true;

    for (JsonNode record : oldArray) {
        if (!record.isObject() || record.get("id") == null
                || record.get("id").isNull()) {
            recordsHaveIds = false;
            break;
        }
        oldRecords.put(record.get("id").asText(), record);
    }

    if (recordsHaveIds) {
        for (JsonNode record : newArray) {
            if (!record.isObject() || record.get("id") == null
                    || record.get("id").isNull()) {
                recordsHaveIds = false;
                break;
            }
            newRecords.put(record.get("id").asText(), record);
        }
    }

    if (!recordsHaveIds) {
        changes.add(new ProfileFieldChange(
                path,
                "records",
                displayChangeValue(oldArray),
                displayChangeValue(newArray)));
        return;
    }

    for (Map.Entry<String, JsonNode> entry : newRecords.entrySet()) {
        String recordId = entry.getKey();
        JsonNode newRecord = entry.getValue();
        JsonNode oldRecord = oldRecords.get(recordId);

        if (oldRecord == null) {
            changes.add(new ProfileFieldChange(
                    path,
                    "Added record",
                    null,
                    describeRecord(newRecord)));
        } else {
            compareNodes(
                    path + "." + recordId,
                    oldRecord,
                    newRecord,
                    changes);
        }
    }

    for (Map.Entry<String, JsonNode> entry : oldRecords.entrySet()) {
        if (!newRecords.containsKey(entry.getKey())) {
            changes.add(new ProfileFieldChange(
                    path,
                    "Removed record",
                    describeRecord(entry.getValue()),
                    null));
        }
    }
}

private String displayChangeValue(JsonNode node) {
    if (node == null || node.isNull()) {
        return null;
    }

    return node.isValueNode() ? node.asText() : node.toString();
}

private String describeRecord(JsonNode record) {
    if (record == null || !record.isObject()) {
        return displayChangeValue(record);
    }

    List<String> details = new ArrayList<>();
    Iterator<String> names = record.fieldNames();

    while (names.hasNext()) {
        String name = names.next();

        if (isInternalField(name)
                || "storagePath".equalsIgnoreCase(name)) {
            continue;
        }

        JsonNode value = record.get(name);

        if (value != null && !value.isNull()
                && value.isValueNode()
                && !value.asText().isBlank()) {
            details.add(name + ": " + value.asText());
        }
    }

    return String.join(", ", details);
}

private boolean isInternalField(String name) {
    return "id".equalsIgnoreCase(name)
            || "createdAt".equals(name)
            || "updatedAt".equals(name)
            || "submittedAt".equals(name)
            || "verifiedAt".equals(name)
            || "profileStatus".equals(name)
            || "rejectionReason".equals(name)
            || "storagePath".equalsIgnoreCase(name);
}

    private String serializeCurrentProfile(Profile profile) {
        try {
            Map<String, Object> snapshot = new LinkedHashMap<>();

            snapshot.put("profile", toScalarMap(profile));

            snapshot.put(
                    "education",
                    toScalarMaps(
                            educationRepository
                                    .findByProfileIdOrderByCreatedAtAsc(
                                            profile.getId())
                    )
            );

            snapshot.put(
                    "family",
                    familyRepository.findByProfileId(profile.getId())
                            .map(this::toScalarMap)
                            .orElse(null)
            );

            snapshot.put(
                    "occupation",
                    occupationRepository.findByProfileId(profile.getId())
                            .map(this::toScalarMap)
                            .orElse(null)
            );

            snapshot.put(
                    "relatives",
                    toScalarMaps(
                            relativeRepository
                                    .findByProfileIdOrderByCreatedAtAsc(
                                            profile.getId())
                    )
            );

            snapshot.put(
                    "photos",
                    toScalarMaps(
                            photoRepository
                                    .findByProfileIdOrderByDisplayOrderAsc(
                                            profile.getId())
                    )
            );

            return objectMapper.writeValueAsString(snapshot);

        } catch (Exception exception) {
            throw new IllegalStateException(
                    "Unable to create profile review snapshot: "
                    + exception.getMessage(),
            exception
            );
        }
    }

    private List<Map<String, Object>> toScalarMaps(
            List<?> records) {

        List<Map<String, Object>> result = new ArrayList<>();

        for (Object record : records) {
            result.add(toScalarMap(record));
        }

        return result;
    }

    /**
     * Extract simple bean properties without serializing
     * JPA relationships such as profile or user.
     */
    private Map<String, Object> toScalarMap(Object bean) {
        Map<String, Object> result = new LinkedHashMap<>();

        if (bean == null) {
            return result;
        }

        try {
            var beanInfo = Introspector.getBeanInfo(
                    bean.getClass(), Object.class);

            for (var descriptor : beanInfo.getPropertyDescriptors()) {
                String name = descriptor.getName();

                if ("profile".equals(name) || "user".equals(name)) {
                    continue;
                }

                Method getter = descriptor.getReadMethod();

                if (getter == null) {
                    continue;
                }

                Object value = getter.invoke(bean);

                if (value == null
                        || value instanceof String
                        || value instanceof Number
                        || value instanceof Boolean
                        || value instanceof java.util.UUID
                        || value instanceof java.time.temporal.TemporalAccessor
                        || value instanceof Enum<?>) {

                    result.put(name, value);
                }
            }

            return result;

        } catch (Exception exception) {
            throw new IllegalStateException(
                    "Unable to read profile snapshot properties: "
                        + exception.getMessage(),
                exception
            );
        }
    }
}
