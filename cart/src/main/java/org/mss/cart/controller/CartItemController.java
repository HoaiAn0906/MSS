package org.mss.cart.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.mss.cart.services.CartItemService;
import org.mss.cart.viewmodel.CartItemDeleteVm;
import org.mss.cart.viewmodel.CartItemGetVm;
import org.mss.cart.viewmodel.CartItemPostVm;
import org.mss.cart.viewmodel.CartItemPutVm;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CartItemController {
    private final CartItemService cartItemService;

    @GetMapping("/storefront/cart/items")
    public ResponseEntity<List<CartItemGetVm>> getCartItems() {
        List<CartItemGetVm> cartItemGetVms = cartItemService.getCartItems();
        return ResponseEntity.ok(cartItemGetVms);
    }

    @PostMapping("/storefront/cart/items")
    public ResponseEntity<CartItemGetVm> addCartItem(@Valid @RequestBody CartItemPostVm cartItemPostVm) {
        CartItemGetVm cartItemGetVm = cartItemService.addCartItem(cartItemPostVm);
        return ResponseEntity.ok(cartItemGetVm);
    }

    @PutMapping("/storefront/cart/items/{productId}")
    public ResponseEntity<CartItemGetVm> updateCartItem(@PathVariable Long productId,
                                                        @Valid @RequestBody CartItemPutVm cartItemPutVm) {
        CartItemGetVm cartItemGetVm = cartItemService.updateCartItem(productId, cartItemPutVm);
        return ResponseEntity.ok(cartItemGetVm);
    }

    @PostMapping("/storefront/cart/items/remove")
    public ResponseEntity<List<CartItemGetVm>> removeCartItems(
            @RequestBody List<@Valid CartItemDeleteVm> cartItemDeleteVms) {
        List<CartItemGetVm> cartItemGetVms = cartItemService.deleteOrAdjustCartItem(cartItemDeleteVms);
        return ResponseEntity.ok(cartItemGetVms);
    }

    @DeleteMapping("/storefront/cart/items/{productId}")
    public ResponseEntity<Void> deleteCartItem(@PathVariable Long productId) {
        cartItemService.deleteCartItem(productId);
        return ResponseEntity.noContent().build();
    }
}
