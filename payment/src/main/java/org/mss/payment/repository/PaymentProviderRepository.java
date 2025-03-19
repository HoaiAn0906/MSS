package org.mss.payment.repository;

import org.mss.payment.model.PaymentProvider;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentProviderRepository extends JpaRepository<PaymentProvider, String> {

    List<PaymentProvider> findByEnabledTrue(Pageable pageable);

}