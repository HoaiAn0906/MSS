package org.mss.order.repository;

import org.mss.order.model.Checkout;
import org.mss.order.model.enumeration.CheckoutState;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CheckoutRepository extends JpaRepository<Checkout, String> {
    Optional<Checkout> findByIdAndCheckoutState(String id, CheckoutState state);
}
