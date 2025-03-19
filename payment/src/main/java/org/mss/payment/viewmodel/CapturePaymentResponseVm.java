package org.mss.payment.viewmodel;

import org.mss.payment.model.enumeration.PaymentMethod;
import org.mss.payment.model.enumeration.PaymentStatus;
import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record CapturePaymentResponseVm(
        Long orderId,
        String checkoutId,
        BigDecimal amount,
        BigDecimal paymentFee,
        String gatewayTransactionId,
        PaymentMethod paymentMethod,
        PaymentStatus paymentStatus,
        String failureMessage) {
}