package org.mss.cart.mapper;

import org.mss.cart.model.CartItem;
import org.mss.cart.viewmodel.CartItemGetVm;
import org.mss.cart.viewmodel.CartItemPostVm;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CartItemMapper {
    public CartItemGetVm toGetVm(CartItem cartItem) {
        return CartItemGetVm
                .builder()
                .customerId(cartItem.getCustomerId())
                .productId(cartItem.getProductId())
                .quantity(cartItem.getQuantity())
                .build();
    }

    public List<CartItemGetVm> toGetVms(List<CartItem> cartItems) {
        return cartItems
                .stream()
                .map(this::toGetVm)
                .toList();
    }

    public CartItem toCartItem(CartItemPostVm cartItemPostVm, String currentUserId) {
        return CartItem
                .builder()
                .customerId(currentUserId)
                .productId(cartItemPostVm.productId())
                .quantity(cartItemPostVm.quantity())
                .build();
    }

    public CartItem toCartItem(String currentUserId, Long productId, Integer quantity) {
        return CartItem
                .builder()
                .customerId(currentUserId)
                .productId(productId)
                .quantity(quantity)
                .build();
    }
}
