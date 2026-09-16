package com.vivahjodi.admin;

import com.vivahjodi.user.User;
import com.vivahjodi.user.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.OffsetDateTime;

@Component
public class AdminInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.email:}")
    private String adminEmail;

    @Value("${app.admin.password:}")
    private String adminPassword;

    public AdminInitializer(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {

        if (adminEmail == null || adminEmail.isBlank()
                || adminPassword == null || adminPassword.isBlank()) {

            System.out.println(
                    "Admin initializer skipped: admin credentials are not configured."
            );

            return;
        }

        String email = adminEmail.trim().toLowerCase();

        User existingUser = userRepository.findByEmail(email).orElse(null);

        if (existingUser != null) {

            if (!"ADMIN".equals(existingUser.getRole())) {
                System.out.println(
                        "Admin initializer stopped: email already belongs to a non-admin user: "
                                + email
                );
            } else {
                System.out.println(
                        "Admin account already exists: " + email
                );
            }

            return;
        }

        User admin = new User();

        admin.setEmail(email);
        admin.setMobileNumber(null);
        admin.setPasswordHash(
                passwordEncoder.encode(adminPassword)
        );

        admin.setRole("ADMIN");
        admin.setAccountStatus("ACTIVE");

        admin.setEmailVerified(true);
        admin.setMobileVerified(true);

        OffsetDateTime now = OffsetDateTime.now();

        admin.setCreatedAt(now);
        admin.setUpdatedAt(now);

        userRepository.save(admin);

        System.out.println(
                "================================================="
        );
        System.out.println(
                "VivahJodi ADMIN account created successfully."
        );
        System.out.println(
                "Admin email: " + email
        );
        System.out.println(
                "================================================="
        );
    }
}
