package org.mss.location.repository;

import org.mss.location.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findAllByIdIn(List<Long> ids);
}
