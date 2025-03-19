package org.mss.order.viewmodel.checkout;

import org.mss.order.model.enumeration.CheckoutState;
import lombok.Builder;

import java.math.BigDecimal;
import java.util.Set;

@Builder(toBuilder = true)
public record CheckoutVm(
        String id,
        String email,
        String note,
        String promotionCode,
        CheckoutState checkoutState,
        String progress,
        BigDecimal totalAmount,
        BigDecimal totalShipmentFee,
        BigDecimal totalShipmentTax, 
        BigDecimal totalTax,
        BigDecimal totalDiscountAmount,
        String shipmentMethodId,
        String paymentMethodId,
        Long shippingAddressId,
        Set<CheckoutItemVm> checkoutItemVms) {

}
