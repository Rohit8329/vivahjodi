package com.vivahjodi.search;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}