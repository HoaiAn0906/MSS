package org.mss.order.mapper;

import org.mss.order.model.csv.OrderItemCsv;
import org.mss.order.viewmodel.order.OrderBriefVm;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
@Component
public interface OrderMapper {
    @Mapping(target = "phone", source = "billingAddressVm.phone")
    @Mapping(target = "id", source = "id")
    OrderItemCsv toCsv(OrderBriefVm orderItem);
}
