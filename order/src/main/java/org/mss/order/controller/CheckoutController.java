package org.mss.order.controller;

import org.mss.commonlibrary.constants.ApiConstant;
import org.mss.order.service.CheckoutService;
import org.mss.order.viewmodel.ErrorVm;
import org.mss.order.viewmodel.checkout.CheckoutPaymentMethodPutVm;
import org.mss.order.viewmodel.checkout.CheckoutPostVm;
import org.mss.order.viewmodel.checkout.CheckoutStatusPutVm;
import org.mss.order.viewmodel.checkout.CheckoutVm;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class CheckoutController {

    private final CheckoutService checkoutService;

    @PostMapping("/storefront/checkouts")
    public ResponseEntity<CheckoutVm> createCheckout(@Valid @RequestBody CheckoutPostVm checkoutPostVm) {
        return ResponseEntity.ok(checkoutService.createCheckout(checkoutPostVm));
    }

    @PutMapping("/storefront/checkouts/status")
    public ResponseEntity<Long> updateCheckoutStatus(@Valid @RequestBody CheckoutStatusPutVm checkoutStatusPutVm) {
        return ResponseEntity.ok(checkoutService.updateCheckoutStatus(checkoutStatusPutVm));
    }

    @GetMapping("/storefront/checkouts/{id}")
    public ResponseEntity<CheckoutVm> getOrderWithItemsById(@PathVariable String id) {
        return ResponseEntity.ok(checkoutService.getCheckoutPendingStateWithItemsById(id));
    }

    @PutMapping("/storefront/checkouts/{id}/payment-method")
    @ApiResponses(value = {
        @ApiResponse(responseCode = ApiConstant.CODE_200, description = ApiConstant.OK,
            content = @Content()),
        @ApiResponse(responseCode = ApiConstant.CODE_404, description = ApiConstant.NOT_FOUND,
            content = @Content(schema = @Schema(implementation = ErrorVm.class))),
        @ApiResponse(responseCode = ApiConstant.CODE_400, description = ApiConstant.BAD_REQUEST,
            content = @Content(schema = @Schema(implementation = ErrorVm.class)))})
    public ResponseEntity<Void> updatePaymentMethod(@PathVariable final String id,
                                                    @Valid @RequestBody
                                                    final CheckoutPaymentMethodPutVm checkoutPaymentMethodPutVm) {
        checkoutService.updateCheckoutPaymentMethod(id, checkoutPaymentMethodPutVm);
        return ResponseEntity.ok().build();
    }
}