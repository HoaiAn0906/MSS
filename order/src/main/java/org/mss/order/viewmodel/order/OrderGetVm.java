package org.mss.order.viewmodel.order;

import org.mss.order.model.Order;
import org.mss.order.model.OrderItem;
import org.mss.order.model.enumeration.DeliveryMethod;
import org.mss.order.model.enumeration.DeliveryStatus;
import org.mss.order.model.enumeration.OrderStatus;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Set;

public record OrderGetVm(
        Long id,
        OrderStatus orderStatus,
        BigDecimal totalPrice,
        DeliveryStatus deliveryStatus,
        DeliveryMethod deliveryMethod,
        List<OrderItemGetVm> orderItems,

        ZonedDateTime createdOn
) {
    public static OrderGetVm fromModel(Order order, Set<OrderItem> orderItems) {
        return new OrderGetVm(
                order.getId(),
                order.getOrderStatus(),
                order.getTotalPrice(),
                order.getDeliveryStatus(),
                order.getDeliveryMethod(),
                OrderItemGetVm.fromModels(orderItems),
                order.getCreatedOn());
    }
}
