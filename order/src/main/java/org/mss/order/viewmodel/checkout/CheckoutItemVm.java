package org.mss.order.viewmodel.checkout;

import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record CheckoutItemVm(
        Long id,
        Long productId,
        String productName,
        String description,
        int quantity,
        BigDecimal productPrice,
        BigDecimal taxAmount,
        BigDecimal discountAmount,
        BigDecimal shipmentFee,
        BigDecimal shipmentTax,
        String checkoutId) {

}
