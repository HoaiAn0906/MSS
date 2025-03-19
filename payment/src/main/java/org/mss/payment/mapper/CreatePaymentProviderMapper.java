package org.mss.payment.mapper;

import org.mss.commonlibrary.mapper.EntityCreateUpdateMapper;
import org.mss.payment.model.PaymentProvider;
import org.mss.payment.viewmodel.paymentprovider.CreatePaymentVm;
import org.mss.payment.viewmodel.paymentprovider.PaymentProviderVm;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CreatePaymentProviderMapper extends
    EntityCreateUpdateMapper<PaymentProvider, CreatePaymentVm, PaymentProviderVm> {

    @Mapping(target = "isNew", constant = "true")
    @Override
    PaymentProvider toModel(CreatePaymentVm vm);
}