package com.vivahjodi.search;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@RestController
@RequestMapping("/api/search")
public class ProfileSearchController {

    private final ProfileSearchService profileSearchService;

    public ProfileSearchController(
            ProfileSearchService profileSearchService
    ) {
        this.profileSearchService = profileSearchService;
    }

    @PostMapping("/profiles")
    public ResponseEntity<List<ProfileSearchResponse>> searchProfiles(
            @RequestBody ProfileSearchRequest request
    ) {

        List<ProfileSearchResponse> results =
                profileSearchService.search(request);

        return ResponseEntity.ok(results);
    }


    /* remove the following @PostMapping("/public/profiles")
    to lock visitor for filter profile  */

    @PostMapping("/public/profiles")
    public ResponseEntity<List<ProfileSearchResponse>> searchPublicProfiles(
            @RequestBody ProfileSearchRequest request) {

        List<ProfileSearchResponse> results =
                profileSearchService.searchPublicProfiles(request);

        return ResponseEntity.ok(results);
    }




    @GetMapping("/public/brides")
    public ResponseEntity<List<ProfileSearchResponse>> getPublicBrides() {

        return ResponseEntity.ok(
                profileSearchService.getPublicProfilesByGender("FEMALE")
        );
    }

    @GetMapping("/public/grooms")
    public ResponseEntity<List<ProfileSearchResponse>> getPublicGrooms() {

        return ResponseEntity.ok(
                profileSearchService.getPublicProfilesByGender("MALE")
        );
    }
}