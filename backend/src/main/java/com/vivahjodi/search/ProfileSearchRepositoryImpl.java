package com.vivahjodi.search;

import com.vivahjodi.profile.Profile;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class ProfileSearchRepositoryImpl
        implements ProfileSearchRepository {

    @PersistenceContext
    private EntityManager entityManager;

   /* @Override
    public List<Profile> search(ProfileSearchRequest request) {
      if you wants to lock visitors to filter profiles for that
      remove the following @Override & private */

      @Override
        public List<Profile> search(ProfileSearchRequest request) {
        return searchInternal(request, false);
        }

        @Override
        public List<Profile> searchPublic(ProfileSearchRequest request) {
        return searchInternal(request, true);
        }

      private List<Profile> searchInternal(
        ProfileSearchRequest request,
        boolean publicOnly
        ) {

        StringBuilder jpql = new StringBuilder(
                "SELECT p FROM Profile p JOIN FETCH p.user " +
                "WHERE p.profileStatus = :profileStatus " +
                "AND p.visibility IN :visibilities"
        );

        List<String> conditions = new ArrayList<>();

        if (request.getGender() != null
                && !request.getGender().isBlank()) {
            conditions.add("p.gender = :gender");
        }

        if (request.getMaritalStatus() != null
                && !request.getMaritalStatus().isBlank()) {
        conditions.add(
                "p.maritalStatus = :maritalStatus"
        );
        }

        if (request.getMotherTongue() != null
                && !request.getMotherTongue().isBlank()) {
        conditions.add(
                "LOWER(TRIM(p.motherTongue)) LIKE " +
                "LOWER(CONCAT('%', TRIM(:motherTongue), '%'))"
        );
        }

        if (request.getComplexion() != null
                && !request.getComplexion().isBlank()) {
        conditions.add(
                "LOWER(TRIM(p.complexion)) LIKE " +
                "LOWER(CONCAT('%', TRIM(:complexion), '%'))"
        );
        }

        if (request.getBodyType() != null
                && !request.getBodyType().isBlank()) {
        conditions.add(
                "LOWER(TRIM(p.bodyType)) LIKE " +
                "LOWER(CONCAT('%', TRIM(:bodyType), '%'))"
        );
        }





        if (request.getCity() != null
                && !request.getCity().isBlank()) {
            conditions.add("LOWER(p.city) = LOWER(:city)");
        }

        if (request.getMinAge() != null) {
            conditions.add(
                    "p.dateOfBirth <= :maxDateOfBirth"
            );
        }

        if (request.getMaxAge() != null) {
            conditions.add(
                    "p.dateOfBirth >= :minDateOfBirth"
            );
        }

        if (request.getMinHeightCm() != null) {
        conditions.add("p.heightCm >= :minHeightCm");
        }

        if (request.getMaxHeightCm() != null) {
        conditions.add("p.heightCm <= :maxHeightCm");
        }

        if (request.getPhysicalDisability() != null) {
        conditions.add("p.physicalDisability = :physicalDisability");
        }




        if (request.getCaste() != null
                && !request.getCaste().isBlank()) {
            conditions.add(
                "LOWER(TRIM(p.caste)) LIKE LOWER(CONCAT('%', TRIM(:caste), '%'))"
                );
        }


        if (request.getSubCaste() != null
        && !request.getSubCaste().isBlank()) {
        conditions.add(
                "LOWER(TRIM(p.subCaste)) LIKE " +
                "LOWER(CONCAT('%', TRIM(:subCaste), '%'))"
        );
        }


        if (request.getEducation() != null
        && !request.getEducation().isBlank()) {
    conditions.add(
        """
        EXISTS (
            SELECT e.id
            FROM EducationDetail e
            WHERE e.profile.id = p.id
              AND (
                    LOWER(TRIM(e.qualification))
                        LIKE LOWER(CONCAT('%', TRIM(:education), '%'))
                 OR LOWER(TRIM(e.specialization))
                        LIKE LOWER(CONCAT('%', TRIM(:education), '%'))
                 OR LOWER(TRIM(e.educationStream))
                        LIKE LOWER(CONCAT('%', TRIM(:education), '%'))
                 OR LOWER(TRIM(e.educationLevel))
                        LIKE LOWER(CONCAT('%', TRIM(:education), '%'))
              )
        )
        """
    );
}


if (request.getOccupation() != null
        && !request.getOccupation().isBlank()) {
    conditions.add(
        """
        EXISTS (
            SELECT o.id
            FROM OccupationDetail o
            WHERE o.profile.id = p.id
              AND LOWER(TRIM(o.occupation))
                    LIKE LOWER(CONCAT('%', TRIM(:occupation), '%'))
        )
        """
    );
}

if (request.getMinIncome() != null) {
    conditions.add(
        """
        EXISTS (
            SELECT o.id
            FROM OccupationDetail o
            WHERE o.profile.id = p.id
              AND o.annualIncome >= :minIncome
        )
        """
    );
}

if (request.getMaxIncome() != null) {
    conditions.add(
        """
        EXISTS (
            SELECT o.id
            FROM OccupationDetail o
            WHERE o.profile.id = p.id
              AND o.annualIncome <= :maxIncome
        )
        """
    );
}

if (request.getZodiacSign() != null
        && !request.getZodiacSign().isBlank()) {
    conditions.add(
        "LOWER(TRIM(p.zodiacSign)) LIKE " +
        "LOWER(CONCAT('%', TRIM(:zodiacSign), '%'))"
    );
}

if (request.getNakshatra() != null
        && !request.getNakshatra().isBlank()) {
    conditions.add(
        "LOWER(TRIM(p.nakshatra)) LIKE " +
        "LOWER(CONCAT('%', TRIM(:nakshatra), '%'))"
    );
}

if (request.getManglikStatus() != null
        && !request.getManglikStatus().isBlank()) {
    conditions.add(
        "LOWER(TRIM(p.manglikStatus)) = " +
        "LOWER(TRIM(:manglikStatus))"
    );
}

if (request.getEatingHabits() != null
        && !request.getEatingHabits().isBlank()) {
    conditions.add(
        "LOWER(TRIM(p.eatingHabits)) = " +
        "LOWER(TRIM(:eatingHabits))"
    );
}

if (request.getSmokingHabits() != null
        && !request.getSmokingHabits().isBlank()) {
    conditions.add(
        "LOWER(TRIM(p.smokingHabits)) = " +
        "LOWER(TRIM(:smokingHabits))"
    );
}

if (request.getDrinkingHabits() != null
        && !request.getDrinkingHabits().isBlank()) {
    conditions.add(
        "LOWER(TRIM(p.drinkingHabits)) = " +
        "LOWER(TRIM(:drinkingHabits))"
    );
}

if (request.getNri() != null) {
    conditions.add("p.nri = :nri");
}

if (request.getNriCountry() != null
        && !request.getNriCountry().isBlank()) {
    conditions.add(
        "LOWER(TRIM(p.livingCountry)) = " +
        "LOWER(TRIM(:nriCountry))"
    );
}

if (request.getCurrentCountry() != null
        && !request.getCurrentCountry().isBlank()) {
    conditions.add(
        "LOWER(TRIM(p.currentCountry)) = " +
        "LOWER(TRIM(:currentCountry))"
    );
}

if (request.getCurrentAddress() != null
        && !request.getCurrentAddress().isBlank()) {
    conditions.add(
        "LOWER(TRIM(p.currentAddress)) LIKE " +
        "LOWER(CONCAT('%', TRIM(:currentAddress), '%'))"
    );
}

if (request.getCurrentPincode() != null
        && !request.getCurrentPincode().isBlank()) {
    conditions.add(
        "TRIM(p.currentPincode) = TRIM(:currentPincode)"
    );
}

if (request.getCurrentState() != null
        && !request.getCurrentState().isBlank()) {
    conditions.add(
        "LOWER(TRIM(p.currentState)) = " +
        "LOWER(TRIM(:currentState))"
    );
}

if (request.getCurrentDistrict() != null
        && !request.getCurrentDistrict().isBlank()) {
    conditions.add(
        "LOWER(TRIM(p.currentDistrict)) = " +
        "LOWER(TRIM(:currentDistrict))"
    );
}

if (request.getCurrentTaluka() != null
        && !request.getCurrentTaluka().isBlank()) {
    conditions.add(
        "LOWER(TRIM(p.currentTaluka)) = " +
        "LOWER(TRIM(:currentTaluka))"
    );
}

if (request.getCurrentCity() != null
        && !request.getCurrentCity().isBlank()) {
    conditions.add(
        "LOWER(TRIM(p.currentCity)) = " +
        "LOWER(TRIM(:currentCity))"
    );
}


if (request.getNativeState() != null
        && !request.getNativeState().isBlank()) {
    conditions.add(
        "LOWER(TRIM(p.nativeState)) = " +
        "LOWER(TRIM(:nativeState))"
    );
}

if (request.getNativeDistrict() != null
        && !request.getNativeDistrict().isBlank()) {
    conditions.add(
        "LOWER(TRIM(p.nativeDistrict)) = " +
        "LOWER(TRIM(:nativeDistrict))"
    );
}

if (request.getNativeTaluka() != null
        && !request.getNativeTaluka().isBlank()) {
    conditions.add(
        "LOWER(TRIM(p.nativeTaluka)) = " +
        "LOWER(TRIM(:nativeTaluka))"
    );
}

if (request.getNativeCity() != null
        && !request.getNativeCity().isBlank()) {
    conditions.add(
        "LOWER(TRIM(p.nativeCity)) = " +
        "LOWER(TRIM(:nativeCity))"
    );
}










if (request.getReligion() != null
        && !request.getReligion().isBlank()) {

    conditions.add(
            "LOWER(TRIM(p.religion)) LIKE " +
            "LOWER(CONCAT('%', TRIM(:religion), '%'))"
    );
}





        for (String condition : conditions) {
            jpql.append(" AND ").append(condition);
        }

        jpql.append(" ORDER BY p.createdAt DESC");

        TypedQuery<Profile> query =
                entityManager.createQuery(
                        jpql.toString(),
                        Profile.class
                );


        query.setParameter("profileStatus", "ACTIVE");

       /* query.setParameter(
                "visibilities",
                List.of("MEMBERS_ONLY", "PUBLIC")
        );
        remove following query for visitor to filter*/

        query.setParameter(
                "visibilities",
                publicOnly
                        ? List.of("PUBLIC")
                        : List.of("MEMBERS_ONLY", "PUBLIC")
        );


        if (request.getGender() != null
                && !request.getGender().isBlank()) {
            query.setParameter(
                    "gender",
                    request.getGender().trim()
            );
        }

        if (request.getMaritalStatus() != null
                && !request.getMaritalStatus().isBlank()) {
        query.setParameter(
                "maritalStatus",
                request.getMaritalStatus().trim()
        );
        }

        if (request.getMotherTongue() != null
                && !request.getMotherTongue().isBlank()) {
        query.setParameter(
                "motherTongue",
                request.getMotherTongue().trim()
        );
        }

        if (request.getComplexion() != null
                && !request.getComplexion().isBlank()) {
        query.setParameter(
                "complexion",
                request.getComplexion().trim()
        );
        }

        if (request.getBodyType() != null
                && !request.getBodyType().isBlank()) {
        query.setParameter(
                "bodyType",
                request.getBodyType().trim()
        );
        }



        if (request.getCity() != null
                && !request.getCity().isBlank()) {
            query.setParameter(
                    "city",
                    request.getCity().trim()
            );
        }

        if (request.getCaste() != null
                && !request.getCaste().isBlank()) {
            query.setParameter(
                    "caste",
                    request.getCaste().trim()
            );
        }

        if (request.getSubCaste() != null
                && !request.getSubCaste().isBlank()) {
        query.setParameter(
                "subCaste",
                request.getSubCaste().trim()
        );
        }




        if (request.getEducation() != null
                && !request.getEducation().isBlank()) {
            query.setParameter(
                "education",
                request.getEducation().trim()
        );
        }

        if (request.getReligion() != null
                && !request.getReligion().isBlank()) {

        query.setParameter(
                "religion",
                request.getReligion().trim()
        );
        }





        if (request.getMinAge() != null) {
            query.setParameter(
                    "maxDateOfBirth",
                    java.time.LocalDate.now()
                            .minusYears(request.getMinAge())
                            .plusDays(1)
            );
        }

        if (request.getMaxAge() != null) {
            query.setParameter(
                    "minDateOfBirth",
                    java.time.LocalDate.now()
                            .minusYears(request.getMaxAge() + 1)
                            .plusDays(1)
            );
        }

        if (request.getMinHeightCm() != null) {
        query.setParameter(
                "minHeightCm",
                request.getMinHeightCm()
        );
        }

        if (request.getMaxHeightCm() != null) {
        query.setParameter(
                "maxHeightCm",
                request.getMaxHeightCm()
        );
        }

        if (request.getPhysicalDisability() != null) {
        query.setParameter(
                "physicalDisability",
                request.getPhysicalDisability()
        );
        }


        if (request.getOccupation() != null
                && !request.getOccupation().isBlank()) {
        query.setParameter(
                "occupation",
                request.getOccupation().trim()
        );
        }

        if (request.getMinIncome() != null) {
        query.setParameter(
                "minIncome",
                request.getMinIncome()
        );
        }

        if (request.getMaxIncome() != null) {
        query.setParameter(
                "maxIncome",
                request.getMaxIncome()
        );
        }

        if (request.getZodiacSign() != null
                && !request.getZodiacSign().isBlank()) {
        query.setParameter(
                "zodiacSign",
                request.getZodiacSign().trim()
        );
        }

        if (request.getNakshatra() != null
                && !request.getNakshatra().isBlank()) {
        query.setParameter(
                "nakshatra",
                request.getNakshatra().trim()
        );
        }

        if (request.getManglikStatus() != null
                && !request.getManglikStatus().isBlank()) {
        query.setParameter(
                "manglikStatus",
                request.getManglikStatus().trim()
        );
        }

        if (request.getEatingHabits() != null
                && !request.getEatingHabits().isBlank()) {
        query.setParameter(
                "eatingHabits",
                request.getEatingHabits().trim()
        );
        }

        if (request.getSmokingHabits() != null
                && !request.getSmokingHabits().isBlank()) {
        query.setParameter(
                "smokingHabits",
                request.getSmokingHabits().trim()
        );
        }

        if (request.getDrinkingHabits() != null
                && !request.getDrinkingHabits().isBlank()) {
        query.setParameter(
                "drinkingHabits",
                request.getDrinkingHabits().trim()
        );
        }

        if (request.getNri() != null) {
        query.setParameter("nri", request.getNri());
        }

        if (request.getNriCountry() != null
                && !request.getNriCountry().isBlank()) {
        query.setParameter(
                "nriCountry",
                request.getNriCountry().trim()
        );
        }

        if (request.getCurrentCountry() != null
                && !request.getCurrentCountry().isBlank()) {
        query.setParameter(
                "currentCountry",
                request.getCurrentCountry().trim()
        );
        }

        if (request.getCurrentAddress() != null
                && !request.getCurrentAddress().isBlank()) {
        query.setParameter(
                "currentAddress",
                request.getCurrentAddress().trim()
        );
        }

        if (request.getCurrentPincode() != null
                && !request.getCurrentPincode().isBlank()) {
        query.setParameter(
                "currentPincode",
                request.getCurrentPincode().trim()
        );
        }

                if (request.getCurrentState() != null
                && !request.getCurrentState().isBlank()) {
        query.setParameter(
                "currentState",
                request.getCurrentState().trim()
        );
        }

        if (request.getCurrentDistrict() != null
                && !request.getCurrentDistrict().isBlank()) {
        query.setParameter(
                "currentDistrict",
                request.getCurrentDistrict().trim()
        );
        }

        if (request.getCurrentTaluka() != null
                && !request.getCurrentTaluka().isBlank()) {
        query.setParameter(
                "currentTaluka",
                request.getCurrentTaluka().trim()
        );
        }

        if (request.getCurrentCity() != null
                && !request.getCurrentCity().isBlank()) {
        query.setParameter(
                "currentCity",
                request.getCurrentCity().trim()
        );
        }


        if (request.getNativeState() != null
                && !request.getNativeState().isBlank()) {
        query.setParameter(
                "nativeState",
                request.getNativeState().trim()
        );
        }

        if (request.getNativeDistrict() != null
                && !request.getNativeDistrict().isBlank()) {
        query.setParameter(
                "nativeDistrict",
                request.getNativeDistrict().trim()
        );
        }

        if (request.getNativeTaluka() != null
                && !request.getNativeTaluka().isBlank()) {
        query.setParameter(
                "nativeTaluka",
                request.getNativeTaluka().trim()
        );
        }

        if (request.getNativeCity() != null
                && !request.getNativeCity().isBlank()) {
        query.setParameter(
                "nativeCity",
                request.getNativeCity().trim()
        );
        }









        int page =
                request.getPage() == null
                        || request.getPage() < 0
                        ? 0
                        : request.getPage();

        int size =
                request.getSize() == null
                        || request.getSize() < 1
                        ? 20
                        : Math.min(request.getSize(), 50);

        query.setFirstResult(page * size);
        query.setMaxResults(size);

        return query.getResultList();
    }

    @Override
    public List<Profile> findPublicProfilesByGender(String gender) {

        String jpql =
                "SELECT p FROM Profile p JOIN FETCH p.user " +
                "WHERE p.profileStatus = :profileStatus " +
                "AND p.visibility = :visibility " +
                "AND p.gender = :gender " +
                "ORDER BY p.user.lastLogin DESC NULLS LAST, " +
                "p.createdAt DESC";

        TypedQuery<Profile> query =
                entityManager.createQuery(
                        jpql,
                        Profile.class
                );

        query.setParameter(
                "profileStatus",
                "ACTIVE"
        );

        query.setParameter(
                "visibility",
                "PUBLIC"
        );

        query.setParameter(
                "gender",
                gender
        );

        return query.getResultList();
    }
}