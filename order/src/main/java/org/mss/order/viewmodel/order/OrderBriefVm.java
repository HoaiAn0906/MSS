package org.mss.order.viewmodel.order;

import org.mss.order.model.Order;
import org.mss.order.model.enumeration.DeliveryMethod;
import org.mss.order.model.enumeration.DeliveryStatus;
import org.mss.order.model.enumeration.OrderStatus;
import org.mss.order.model.enumeration.PaymentStatus;
import org.mss.order.viewmodel.orderaddress.OrderAddressVm;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.ZonedDateTime;

@Builder
public record OrderBriefVm(
        Long id,
        String email,
        OrderAddressVm billingAddressVm,
        BigDecimal totalPrice,
        OrderStatus orderStatus,
        DeliveryMethod deliveryMethod,
        DeliveryStatus deliveryStatus,
        PaymentStatus paymentStatus,
        ZonedDateTime createdOn
) {
    public static OrderBriefVm fromModel(Order order) {
        return OrderBriefVm.builder()
                .id(order.getId())
                .email(order.getEmail())
                .billingAddressVm(OrderAddressVm.fromModel(order.getBillingAddressId()))
                .totalPrice(order.getTotalPrice())
                .orderStatus(order.getOrderStatus())
                .deliveryMethod(order.getDeliveryMethod())
                .deliveryStatus(order.getDeliveryStatus())
                .paymentStatus(order.getPaymentStatus())
                .createdOn(order.getCreatedOn())
                .build();
    }
}