package org.mss.order.viewmodel.order;

import org.mss.order.model.enumeration.DeliveryMethod;
import org.mss.order.model.enumeration.PaymentMethod;
import org.mss.order.model.enumeration.PaymentStatus;
import org.mss.order.viewmodel.orderaddress.OrderAddressPostVm;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.math.BigDecimal;
import java.util.List;

@Builder
public record OrderPostVm(
        @NotBlank String checkoutId,
        @NotBlank String email,
        @NotNull OrderAddressPostVm shippingAddressPostVm,
        @NotNull OrderAddressPostVm billingAddressPostVm,
        String note,
        float tax,
        float discount,
        int numberItem,
        @NotNull BigDecimal totalPrice,
        BigDecimal deliveryFee,
        String couponCode,
        @NotNull DeliveryMethod deliveryMethod,
        @NotNull PaymentMethod paymentMethod,
        @NotNull PaymentStatus paymentStatus,
        @NotNull
        List<OrderItemPostVm> orderItemPostVms
) {
}