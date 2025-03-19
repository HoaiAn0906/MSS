package org.mss.cart.repositories;

import jakarta.persistence.LockModeType;
import jakarta.persistence.QueryHint;
import org.mss.cart.model.CartItem;
import org.mss.cart.model.CartItemId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, CartItemId> {
    List<CartItem> findByCustomerIdOrderByCreatedOnDesc(String userId);

    /**
     * Retrieves a cart item for a specific customer and product, locking the record to prevent concurrent
     * modifications.
     *
     * @param customerId the ID of the customer whose cart item is being retrieved
     * @param productId the ID of the product for which the cart item should be retrieved
     * @return an {@link Optional} containing the {@link CartItem} entity associated with the specified customer
     *         and product ID, or an empty {@link Optional} if no matching cart item is found
     */
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @QueryHints({@QueryHint(name = "jakarta.persistence.lock.timeout", value = "0")})
    @Query("SELECT c FROM CartItem c WHERE c.customerId = :customerId AND c.productId = :productId")
    Optional<CartItem> findByCustomerIdAndProductId(String customerId, Long productId);

    void deleteByCustomerIdAndProductId(String customerId, Long productId);

    /**
     * Retrieves a list of cart items for a specific customer, locking the records to prevent concurrent modifications.
     *
     * @param customerId the ID of the customer whose cart items are being retrieved
     * @param productIds the list of product IDs for which the cart items should be retrieved
     * @return a list of {@link CartItem} entities associated with the specified customer and product IDs
     */
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @QueryHints({@QueryHint(name = "jakarta.persistence.lock.timeout", value = "0")})
    @Query("SELECT c FROM CartItem c WHERE c.customerId = :customerId AND c.productId IN :productIds")
    List<CartItem> findByCustomerIdAndProductIdIn(String customerId, List<Long> productIds);
}
