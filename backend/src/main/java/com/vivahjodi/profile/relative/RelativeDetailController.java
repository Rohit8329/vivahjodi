package com.vivahjodi.profile.relative;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/profiles/me/relatives")
public class RelativeDetailController {

    private final RelativeDetailService relativeDetailService;

    public RelativeDetailController(
            RelativeDetailService relativeDetailService) {

        this.relativeDetailService = relativeDetailService;
    }

    @PostMapping
    public ResponseEntity<RelativeDetailResponse> addRelative(
            Authentication authentication,
            @RequestBody RelativeDetailRequest request) {

        return ResponseEntity.ok(
                relativeDetailService.addRelative(
                        authentication.getName(),
                        request
                )
        );
    }

    @GetMapping
    public ResponseEntity<List<RelativeDetailResponse>> getMyRelatives(
            Authentication authentication) {

        return ResponseEntity.ok(
                relativeDetailService.getMyRelatives(
                        authentication.getName()
                )
        );
    }

    @PutMapping("/{relativeId}")
    public ResponseEntity<RelativeDetailResponse> updateRelative(
            Authentication authentication,
            @PathVariable UUID relativeId,
            @RequestBody RelativeDetailRequest request) {

        return ResponseEntity.ok(
                relativeDetailService.updateRelative(
                        authentication.getName(),
                        relativeId,
                        request
                )
        );
    }

    @DeleteMapping("/{relativeId}")
    public ResponseEntity<Void> deleteRelative(
            Authentication authentication,
            @PathVariable UUID relativeId) {

        relativeDetailService.deleteRelative(
                authentication.getName(),
                relativeId
        );

        return ResponseEntity.noContent().build();
    }
}