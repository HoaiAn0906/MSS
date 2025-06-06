package org.mss.payment.controller;

import org.mss.payment.service.PaymentProviderService;
import org.mss.payment.viewmodel.paymentprovider.CreatePaymentVm;
import org.mss.payment.viewmodel.paymentprovider.PaymentProviderVm;
import org.mss.payment.viewmodel.paymentprovider.UpdatePaymentVm;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PaymentProviderController {

    private final PaymentProviderService paymentProviderService;

    public PaymentProviderController(PaymentProviderService paymentProviderService) {
        this.paymentProviderService = paymentProviderService;
    }

    //check heath
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Payment Provider Service is running");
    }

    @PostMapping("/backoffice/payment-providers")
    public ResponseEntity<PaymentProviderVm> create(@Valid @RequestBody CreatePaymentVm createPaymentVm) {
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(paymentProviderService.create(createPaymentVm));
    }

   @PutMapping("/backoffice/payment-providers")
    public ResponseEntity<PaymentProviderVm> update(@Valid @RequestBody UpdatePaymentVm updatePaymentVm) {
        return ResponseEntity.ok(paymentProviderService.update(updatePaymentVm));
    }

    @GetMapping("/storefront/payment-providers")
    public ResponseEntity<List<PaymentProviderVm>> getAll(Pageable pageable) {
        var paymentProviders = paymentProviderService.getEnabledPaymentProviders(pageable);
        return ResponseEntity.ok(paymentProviders);
    }

}