package com.vivahjodi.auth;

import java.util.UUID;

public class LoginResponse {

    private UUID userId;
    private String email;
    private String role;
    private String accountStatus;
    private String message;
    private String token;

    public LoginResponse() {
    }

    public LoginResponse(
            UUID userId,
            String email,
            String role,
            String accountStatus,
            String message,
            String token) {

        this.userId = userId;
        this.email = email;
        this.role = role;
        this.accountStatus = accountStatus;
        this.message = message;
        this.token = token;
    }

    public UUID getUserId() {
        return userId;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public String getAccountStatus() {
        return accountStatus;
    }

    public String getMessage() {
        return message;
    }

    public String getToken() {
        return token;
    }
}