package com.vivahjodi.auth;

import com.vivahjodi.security.JwtService;
import com.vivahjodi.user.User;
import com.vivahjodi.user.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public User register(RegisterRequest request) {

        String email = request.getEmail().trim().toLowerCase();

        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException(
                    "An account with this email already exists"
            );
        }

        if (request.getMobileNumber() != null
                && !request.getMobileNumber().isBlank()
                && userRepository.existsByMobileNumber(
                        request.getMobileNumber().trim())) {

            throw new IllegalArgumentException(
                    "An account with this mobile number already exists"
            );
        }

        User user = new User();

        user.setEmail(email);

        user.setMobileNumber(
                request.getMobileNumber() == null
                        || request.getMobileNumber().isBlank()
                        ? null
                        : request.getMobileNumber().trim()
        );

        user.setPasswordHash(
                passwordEncoder.encode(request.getPassword())
        );

        user.setRole("USER");

        // Paid registration flow
        user.setAccountStatus("PENDING_PAYMENT");

        user.setEmailVerified(false);
        user.setMobileVerified(false);

        OffsetDateTime now = OffsetDateTime.now();

        user.setCreatedAt(now);
        user.setUpdatedAt(now);

        return userRepository.save(user);
    }

    public LoginResponse login(LoginRequest request) {

        String email = request.getEmail().trim().toLowerCase();

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                email,
                                request.getPassword()
                        )
                );

        User user = userRepository.findByEmail(
                authentication.getName()
        ).orElseThrow(() ->
                new IllegalArgumentException(
                        "User account not found"
                )
        );

        if ("SUSPENDED".equals(user.getAccountStatus())) {
            throw new IllegalArgumentException(
                    "This account has been suspended"
            );
        }

        if ("CANCELLED".equals(user.getAccountStatus())) {
            throw new IllegalArgumentException(
                    "This account has been cancelled"
            );
        }

        String message;

        if ("PENDING_PAYMENT".equals(user.getAccountStatus())) {
            message = "Login successful. Please complete payment.";
        } else if ("PENDING_VERIFICATION".equals(user.getAccountStatus())) {
            message = "Login successful. Your profile is awaiting verification.";
        } else if ("ACTIVE".equals(user.getAccountStatus())) {
            message = "Login successful.";
        } else {
            message = "Login successful.";
        }

        // Generate JWT after successful authentication
        String token = jwtService.generateToken(user.getEmail());

        return new LoginResponse(
                user.getId(),
                user.getEmail(),
                user.getRole(),
                user.getAccountStatus(),
                message,
                token
        );
    }
}