package com.vivahjodi.profile.occupation;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profiles/me/occupation")
public class OccupationDetailController {

    private final OccupationDetailService occupationDetailService;

    public OccupationDetailController(
            OccupationDetailService occupationDetailService) {

        this.occupationDetailService =
                occupationDetailService;
    }

    @PostMapping
    public ResponseEntity<OccupationDetailResponse>
    createOrUpdateOccupation(
            Authentication authentication,
            @RequestBody OccupationDetailRequest request) {

        return ResponseEntity.ok(
                occupationDetailService
                        .createOrUpdateOccupation(
                                authentication.getName(),
                                request
                        )
        );
    }

    @GetMapping
    public ResponseEntity<OccupationDetailResponse>
    getMyOccupation(
            Authentication authentication) {

        OccupationDetailResponse response =
                occupationDetailService
                        .getMyOccupation(
                                authentication.getName()
                        );

        if (response == null) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(response);
    }

    @DeleteMapping
    public ResponseEntity<Void>
    deleteMyOccupation(
            Authentication authentication) {

        occupationDetailService
                .deleteMyOccupation(
                        authentication.getName()
                );

        return ResponseEntity.noContent().build();
    }
}