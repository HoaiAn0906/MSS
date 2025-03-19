package org.mss.location.repository;

import org.mss.location.model.District;
import org.mss.location.viewmodel.district.DistrictGetVm;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DistrictRepository extends JpaRepository<District, Long> {
    List<DistrictGetVm> findAllByStateProvinceIdOrderByNameAsc(Long stateProvinceId);
}
