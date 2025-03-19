package org.mss.payment.service.provider.handler;

import org.mss.payment.model.CapturedPayment;
import org.mss.payment.model.InitiatedPayment;
import org.mss.payment.model.enumeration.PaymentMethod;
import org.mss.payment.model.enumeration.PaymentStatus;
import org.mss.payment.paypal.service.PaypalService;
import org.mss.payment.paypal.viewmodel.PaypalCapturePaymentRequest;
import org.mss.payment.paypal.viewmodel.PaypalCapturePaymentResponse;
import org.mss.payment.paypal.viewmodel.PaypalCreatePaymentRequest;
import org.mss.payment.paypal.viewmodel.PaypalCreatePaymentResponse;
import org.mss.payment.service.PaymentProviderService;
import org.mss.payment.viewmodel.CapturePaymentRequestVm;
import org.mss.payment.viewmodel.InitPaymentRequestVm;
import org.springframework.stereotype.Component;

@Component
public class PaypalHandler extends AbstractPaymentHandler implements PaymentHandler {

    private final PaypalService paypalService;

    PaypalHandler(PaymentProviderService paymentProviderService, PaypalService paypalService) {
        super(paymentProviderService);
        this.paypalService = paypalService;
    }

    @Override
    public String getProviderId() {
        return PaymentMethod.PAYPAL.name();
    }

    @Override
    public InitiatedPayment initPayment(InitPaymentRequestVm initPaymentRequestVm) {
        PaypalCreatePaymentRequest requestPayment = PaypalCreatePaymentRequest.builder()
                .totalPrice(initPaymentRequestVm.totalPrice())
                .checkoutId(initPaymentRequestVm.checkoutId())
                .paymentMethod(initPaymentRequestVm.paymentMethod())
                .paymentSettings(getPaymentSettings(getProviderId()))
                .build();
        PaypalCreatePaymentResponse paypalCreatePaymentResponse = paypalService.createPayment(requestPayment);
        return InitiatedPayment.builder()
                .status(paypalCreatePaymentResponse.status())
                .paymentId(paypalCreatePaymentResponse.paymentId())
                .redirectUrl(paypalCreatePaymentResponse.redirectUrl())
                .build();
    }

    @Override
    public CapturedPayment capturePayment(CapturePaymentRequestVm capturePaymentRequestVm) {
        PaypalCapturePaymentRequest paypalCapturePaymentRequest = PaypalCapturePaymentRequest.builder()
                .token(capturePaymentRequestVm.token())
                .paymentSettings(getPaymentSettings(getProviderId()))
                .build();
        PaypalCapturePaymentResponse paypalCapturePaymentResponse = paypalService.capturePayment(
            paypalCapturePaymentRequest
        );
        return CapturedPayment.builder()
                .checkoutId(paypalCapturePaymentResponse.checkoutId())
                .amount(paypalCapturePaymentResponse.amount())
                .paymentFee(paypalCapturePaymentResponse.paymentFee())
                .gatewayTransactionId(paypalCapturePaymentResponse.gatewayTransactionId())
                .paymentMethod(PaymentMethod.valueOf(paypalCapturePaymentResponse.paymentMethod()))
                .paymentStatus(PaymentStatus.valueOf(paypalCapturePaymentResponse.paymentStatus()))
                .failureMessage(paypalCapturePaymentResponse.failureMessage())
                .build();
    }
}
