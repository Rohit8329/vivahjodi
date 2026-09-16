package com.vivahjodi.payment;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.vivahjodi.membership.Membership;
import com.vivahjodi.membership.MembershipRepository;
import com.vivahjodi.user.User;
import com.vivahjodi.user.UserRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.nio.charset.StandardCharsets;
import java.time.OffsetDateTime;
import java.util.UUID;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;
    private final MembershipRepository membershipRepository;
    private final RazorpayClient razorpayClient;
    private final String razorpayKeySecret;

    public PaymentService(
            PaymentRepository paymentRepository,
            UserRepository userRepository,
            MembershipRepository membershipRepository,
            RazorpayClient razorpayClient,
            @Value("${razorpay.key-secret}") String razorpayKeySecret
    ) {
        this.paymentRepository = paymentRepository;
        this.userRepository = userRepository;
        this.membershipRepository = membershipRepository;
        this.razorpayClient = razorpayClient;
        this.razorpayKeySecret = razorpayKeySecret;
    }

    public Payment createPayment(String email, UUID membershipId) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException("Authenticated user not found"));

        Membership membership = membershipRepository.findById(membershipId)
                .orElseThrow(() ->
                        new IllegalArgumentException("Membership not found"));

        if (!membership.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException(
                    "Membership does not belong to authenticated user"
            );
        }

        if (!"PENDING_PAYMENT".equals(membership.getMembershipStatus())) {
            throw new IllegalArgumentException(
                    "Membership is not available for payment"
            );
        }

        BigDecimal amountInr = membership.getAmountInr();

        if (amountInr == null || amountInr.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException(
                    "Membership amount must be greater than zero"
            );
        }

        int amountInPaise = amountInr
                .multiply(BigDecimal.valueOf(100))
                .setScale(0, RoundingMode.UNNECESSARY)
                .intValueExact();

        try {

            JSONObject orderRequest = new JSONObject();

            orderRequest.put("amount", amountInPaise);
            orderRequest.put("currency", "INR");

            String receipt = "vj_" + UUID.randomUUID();

            orderRequest.put("receipt", receipt);

            Order razorpayOrder = razorpayClient.orders.create(orderRequest);

            String razorpayOrderId = razorpayOrder.get("id");

            if (razorpayOrderId == null || razorpayOrderId.isBlank()) {
                throw new IllegalArgumentException(
                        "Razorpay did not return an order ID"
                );
            }

            Payment payment = new Payment();

            payment.setUser(user);
            payment.setMembership(membership);
            payment.setPaymentGateway("RAZORPAY");
            payment.setGatewayOrderId(razorpayOrderId);
            payment.setGatewayPaymentId(null);
            payment.setAmountInr(amountInr);
            payment.setCurrency("INR");
            payment.setPaymentStatus("CREATED");
            payment.setPaidAt(null);

            OffsetDateTime now = OffsetDateTime.now();

            payment.setCreatedAt(now);
            payment.setUpdatedAt(now);

            return paymentRepository.save(payment);

        } catch (Exception exception) {

            throw new IllegalArgumentException(
                    "Unable to create Razorpay order: "
                            + exception.getMessage()
            );
        }
    }

    @Transactional
    public Payment verifyPayment(
            String email,
            String razorpayOrderId,
            String razorpayPaymentId,
            String razorpaySignature
    ) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException("Authenticated user not found"));

        Payment payment = paymentRepository
                .findByGatewayOrderId(razorpayOrderId)
                .orElseThrow(() ->
                        new IllegalArgumentException("Payment order not found"));

        if (!payment.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException(
                    "Payment does not belong to authenticated user"
            );
        }

        if (!"RAZORPAY".equals(payment.getPaymentGateway())) {
            throw new IllegalArgumentException(
                    "Invalid payment gateway"
            );
        }

        if ("SUCCESS".equals(payment.getPaymentStatus())) {
            throw new IllegalArgumentException(
                    "Payment has already been verified"
            );
        }

        String generatedSignature = generateSignature(
                razorpayOrderId,
                razorpayPaymentId,
                razorpayKeySecret
        );

        if (!constantTimeEquals(generatedSignature, razorpaySignature)) {
            throw new IllegalArgumentException(
                    "Invalid Razorpay payment signature"
            );
        }

        OffsetDateTime paidAt = OffsetDateTime.now();

        /*
         * Payment successfully verified.
         */
        payment.setGatewayPaymentId(razorpayPaymentId);
        payment.setPaymentStatus("SUCCESS");
        payment.setPaidAt(paidAt);
        payment.setUpdatedAt(paidAt);

        /*
         * Activate the purchased membership.
         */
        Membership membership = payment.getMembership();

        membership.setMembershipStatus("ACTIVE");
        membership.setStartedAt(paidAt);
        membership.setExpiresAt(paidAt.plusMonths(1));
        membership.setUpdatedAt(paidAt);

        membershipRepository.save(membership);

        /*
         * Payment is complete, but the profile still
         * needs admin verification.
         */
        user.setAccountStatus("PENDING_VERIFICATION");
        user.setUpdatedAt(paidAt);

        userRepository.save(user);

        /*
         * Save the verified payment.
         */
        return paymentRepository.save(payment);
    }

    private String generateSignature(
            String orderId,
            String paymentId,
            String secret
    ) {

        try {

            String payload = orderId + "|" + paymentId;

            Mac mac = Mac.getInstance("HmacSHA256");

            SecretKeySpec secretKey = new SecretKeySpec(
                    secret.getBytes(StandardCharsets.UTF_8),
                    "HmacSHA256"
            );

            mac.init(secretKey);

            byte[] hash = mac.doFinal(
                    payload.getBytes(StandardCharsets.UTF_8)
            );

            StringBuilder hex = new StringBuilder();

            for (byte value : hash) {
                hex.append(String.format("%02x", value));
            }

            return hex.toString();

        } catch (Exception exception) {

            throw new IllegalArgumentException(
                    "Unable to verify Razorpay payment signature"
            );
        }
    }

    private boolean constantTimeEquals(
            String expected,
            String actual
    ) {

        if (expected == null || actual == null) {
            return false;
        }

        return java.security.MessageDigest.isEqual(
                expected.getBytes(StandardCharsets.UTF_8),
                actual.getBytes(StandardCharsets.UTF_8)
        );
    }

    public Payment getLatestPayment(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException("Authenticated user not found"));

        return paymentRepository
                .findTopByUserIdOrderByCreatedAtDesc(user.getId())
                .orElseThrow(() ->
                        new IllegalArgumentException("No payment found"));
    }
}
