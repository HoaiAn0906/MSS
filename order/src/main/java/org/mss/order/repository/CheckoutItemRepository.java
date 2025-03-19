package org.mss.order.repository;

import org.mss.order.model.CheckoutItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CheckoutItemRepository extends JpaRepository<CheckoutItem, Long> {

    List<CheckoutItem> findAllByCheckoutId(String checkoutId);
}
