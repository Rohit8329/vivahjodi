package com.vivahjodi.payment;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping
    public ResponseEntity<PaymentResponse> createPayment(
            Authentication authentication,
            @Valid @RequestBody PaymentRequest request
    ) {

        Payment payment = paymentService.createPayment(
                authentication.getName(),
                request.membershipId()
        );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(toResponse(payment));
    }

    @PostMapping("/verify")
    public ResponseEntity<PaymentResponse> verifyPayment(
            Authentication authentication,
            @Valid @RequestBody PaymentVerificationRequest request
    ) {

        Payment payment = paymentService.verifyPayment(
                authentication.getName(),
                request.razorpayOrderId(),
                request.razorpayPaymentId(),
                request.razorpaySignature()
        );

        return ResponseEntity.ok(toResponse(payment));
    }

    @GetMapping("/me")
    public ResponseEntity<PaymentResponse> getMyLatestPayment(
            Authentication authentication
    ) {

        Payment payment = paymentService.getLatestPayment(
                authentication.getName()
        );

        return ResponseEntity.ok(toResponse(payment));
    }

    private PaymentResponse toResponse(Payment payment) {

        return new PaymentResponse(
                payment.getId(),
                payment.getUser().getId(),
                payment.getMembership().getId(),
                payment.getPaymentGateway(),
                payment.getGatewayOrderId(),
                payment.getGatewayPaymentId(),
                payment.getAmountInr(),
                payment.getCurrency(),
                payment.getPaymentStatus(),
                payment.getPaidAt(),
                payment.getCreatedAt(),
                payment.getUpdatedAt()
        );
    }

    public record PaymentRequest(
            @NotNull(message = "Membership ID is required")
            UUID membershipId
    ) {
    }

    public record PaymentVerificationRequest(

            @NotBlank(message = "Razorpay order ID is required")
            String razorpayOrderId,

            @NotBlank(message = "Razorpay payment ID is required")
            String razorpayPaymentId,

            @NotBlank(message = "Razorpay signature is required")
            String razorpaySignature

    ) {
    }

    public record PaymentResponse(
            UUID id,
            UUID userId,
            UUID membershipId,
            String paymentGateway,
            String gatewayOrderId,
            String gatewayPaymentId,
            BigDecimal amountInr,
            String currency,
            String paymentStatus,
            OffsetDateTime paidAt,
            OffsetDateTime createdAt,
            OffsetDateTime updatedAt
    ) {
    }
}
