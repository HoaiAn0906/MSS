package org.mss.payment.service.provider.handler;

import org.mss.payment.service.PaymentProviderService;

abstract class AbstractPaymentHandler {
    private final PaymentProviderService paymentProviderService;

    AbstractPaymentHandler(PaymentProviderService paymentProviderService) {
        this.paymentProviderService = paymentProviderService;
    }

    String getPaymentSettings(String providerId) {
        return paymentProviderService.getAdditionalSettingsByPaymentProviderId(providerId);
    }
}
