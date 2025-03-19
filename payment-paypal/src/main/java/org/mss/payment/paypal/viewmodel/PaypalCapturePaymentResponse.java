package org.mss.payment.paypal.viewmodel;

import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record PaypalCapturePaymentResponse(
        String checkoutId,
        BigDecimal amount,
        BigDecimal paymentFee,
        String gatewayTransactionId,
        String paymentMethod,
        String paymentStatus,
        String failureMessage) {
}