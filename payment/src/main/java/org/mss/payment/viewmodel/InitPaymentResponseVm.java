package org.mss.payment.viewmodel;

import lombok.Builder;

@Builder
public record InitPaymentResponseVm(String status, String paymentId, String redirectUrl) {
}
