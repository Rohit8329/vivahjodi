package com.vivahjodi.auth;

import java.util.UUID;

public class RegisterResponse {

    private UUID userId;
    private String email;
    private String accountStatus;
    private String message;

    public RegisterResponse() {
    }

    public RegisterResponse(
            UUID userId,
            String email,
            String accountStatus,
            String message) {

        this.userId = userId;
        this.email = email;
        this.accountStatus = accountStatus;
        this.message = message;
    }

    public UUID getUserId() {
        return userId;
    }

    public String getEmail() {
        return email;
    }

    public String getAccountStatus() {
        return accountStatus;
    }

    public String getMessage() {
        return message;
    }
}