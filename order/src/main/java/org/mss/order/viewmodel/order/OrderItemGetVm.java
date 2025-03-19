package org.mss.order.viewmodel.order;

import org.mss.order.model.OrderItem;
import org.springframework.util.CollectionUtils;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

public record OrderItemGetVm(
        Long id,
        Long productId,
        String productName,
        Integer quantity,
        BigDecimal productPrice,
        BigDecimal discountAmount,
        BigDecimal taxAmount
) {
    public static OrderItemGetVm fromModel(OrderItem orderItem) {
        return new OrderItemGetVm(
                orderItem.getId(),
                orderItem.getProductId(),
                orderItem.getProductName(),
                orderItem.getQuantity(),
                orderItem.getProductPrice(),
                orderItem.getDiscountAmount(),
                orderItem.getTaxAmount());
    }

    public static List<OrderItemGetVm> fromModels(Collection<OrderItem> orderItems) {
        if (CollectionUtils.isEmpty(orderItems)) {
            return Collections.emptyList();
        }

        return orderItems.stream().map(OrderItemGetVm::fromModel).toList();
    }
}
