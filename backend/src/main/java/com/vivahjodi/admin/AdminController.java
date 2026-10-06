package com.vivahjodi.admin;

import com.vivahjodi.profile.ProfileResponse;
import com.vivahjodi.profile.ProfileService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final ProfileService profileService;

    public AdminController(ProfileService profileService) {
        this.profileService = profileService;
    }

    // =========================================================
    // ADMIN DASHBOARD TEST
    // =========================================================

    @GetMapping("/dashboard")
    public Map<String, Object> dashboard(
            Authentication authentication
    ) {

        return Map.of(
                "message", "Admin access granted",
                "email", authentication.getName(),
                "role", "ADMIN"
        );
    }

    // =========================================================
    // GET PENDING PROFILES
    // =========================================================

    @GetMapping("/profiles/pending")
    public List<ProfileResponse> getPendingProfiles() {

        return profileService.getPendingProfilesForAdmin();
    }

    // =========================================================
    // APPROVE PROFILE
    // =========================================================

    @PostMapping("/profiles/{profileId}/approve")
    public ProfileResponse approveProfile(
            @PathVariable UUID profileId
    ) {

        return profileService.approveProfileForAdmin(profileId);
    }

    // =========================================================
    // REJECT PROFILE
    // =========================================================

    @PostMapping("/profiles/{profileId}/reject")
    public ProfileResponse rejectProfile(
            @PathVariable UUID profileId,
            @Valid @RequestBody AdminProfileRejectRequest request
    ) {

        return profileService.rejectProfileForAdmin(
                profileId,
                request.getReason()
        );
    }
}