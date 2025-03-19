package org.mss.order.mapper;

import org.mss.order.model.Checkout;
import org.mss.order.model.CheckoutItem;
import org.mss.order.viewmodel.checkout.CheckoutItemPostVm;
import org.mss.order.viewmodel.checkout.CheckoutItemVm;
import org.mss.order.viewmodel.checkout.CheckoutPostVm;
import org.mss.order.viewmodel.checkout.CheckoutVm;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Mapper(componentModel = "spring")
@Component
public interface CheckoutMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "checkout", ignore = true)
    CheckoutItem toModel(CheckoutItemPostVm checkoutItemPostVm);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "checkoutState", ignore = true)
    Checkout toModel(CheckoutPostVm checkoutPostVm);

    @Mapping(target = "checkoutId", source = "checkout.id")
    CheckoutItemVm toVm(CheckoutItem checkoutItem);

    @Mapping(target = "checkoutItemVms", ignore = true)
    CheckoutVm toVm(Checkout checkout);

    default BigDecimal map(BigDecimal value) {
        return value != null ? value : BigDecimal.ZERO;
    }
}
