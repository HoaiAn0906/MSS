package org.mss.order.viewmodel.order;

import org.mss.order.model.Order;
import org.mss.order.model.OrderItem;
import org.mss.order.model.enumeration.DeliveryMethod;
import org.mss.order.model.enumeration.DeliveryStatus;
import org.mss.order.model.enumeration.OrderStatus;
import org.mss.order.model.enumeration.PaymentStatus;
import org.mss.order.viewmodel.orderaddress.OrderAddressVm;
import lombok.Builder;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Builder
public record OrderVm(
        Long id,
        String email,
        OrderAddressVm shippingAddressVm,
        OrderAddressVm billingAddressVm,
        String note,
        float tax,
        float discount,
        int numberItem,
        BigDecimal totalPrice,
        BigDecimal deliveryFee,
        String couponCode,
        OrderStatus orderStatus,
        DeliveryMethod deliveryMethod,
        DeliveryStatus deliveryStatus,
        PaymentStatus paymentStatus,
        Set<OrderItemVm> orderItemVms,
        String checkoutId

) {
    public static OrderVm fromModel(Order order, Set<OrderItem> orderItems) {

        Set<OrderItemVm> orderItemVms = Optional.ofNullable(orderItems)
            .map(items -> items.stream()
                .map(OrderItemVm::fromModel)
                .collect(Collectors.toSet()))
            .orElse(null);

        return OrderVm.builder()
                .id(order.getId())
                .email(order.getEmail())
                .shippingAddressVm(OrderAddressVm.fromModel(order.getShippingAddressId()))
                .billingAddressVm(OrderAddressVm.fromModel(order.getBillingAddressId()))
                .note(order.getNote())
                .tax(order.getTax())
                .discount(order.getDiscount())
                .numberItem(order.getNumberItem())
                .totalPrice(order.getTotalPrice())
                .couponCode(order.getCouponCode())
                .orderStatus(order.getOrderStatus())
                .deliveryFee(order.getDeliveryFee())
                .deliveryMethod(order.getDeliveryMethod())
                .deliveryStatus(order.getDeliveryStatus())
                .paymentStatus(order.getPaymentStatus())
                .orderItemVms(orderItemVms)
                .checkoutId(order.getCheckoutId())
                .build();
    }
}
