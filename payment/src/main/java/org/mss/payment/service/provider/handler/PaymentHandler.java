package org.mss.payment.service.provider.handler;

import org.mss.payment.model.CapturedPayment;
import org.mss.payment.model.InitiatedPayment;
import org.mss.payment.viewmodel.CapturePaymentRequestVm;
import org.mss.payment.viewmodel.InitPaymentRequestVm;

public interface PaymentHandler {
    String getProviderId();

    InitiatedPayment initPayment(InitPaymentRequestVm initPaymentRequestVm);

    CapturedPayment capturePayment(CapturePaymentRequestVm capturePaymentRequestVm);
}
