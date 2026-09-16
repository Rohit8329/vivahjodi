package com.vivahjodi.user;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/me")
    public Map<String, Object> getCurrentUser(
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Authenticated user not found"
                        )
                );

        return Map.of(
                "userId", user.getId(),
                "email", user.getEmail(),
                "mobileNumber",
                user.getMobileNumber() == null
                        ? ""
                        : user.getMobileNumber(),
                "role", user.getRole(),
                "accountStatus", user.getAccountStatus(),
                "emailVerified", user.isEmailVerified(),
                "mobileVerified", user.isMobileVerified()
        );
    }
}