package org.mss.customer.repository;

import org.mss.customer.model.UserAddress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserAddressRepository extends JpaRepository<UserAddress, Long> {
    List<UserAddress> findAllByUserId(String userId);

    UserAddress findOneByUserIdAndAddressId(String userId, Long id);

    Optional<UserAddress> findByUserIdAndIsActiveTrue(String userId);
}
