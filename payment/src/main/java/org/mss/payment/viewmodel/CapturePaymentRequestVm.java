package org.mss.payment.viewmodel;

import lombok.Builder;

@Builder
public record CapturePaymentRequestVm(String paymentMethod, String token) {
}
