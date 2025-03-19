package org.mss.payment.mapper;

import org.mss.commonlibrary.mapper.EntityCreateUpdateMapper;
import org.mss.payment.model.PaymentProvider;
import org.mss.payment.viewmodel.paymentprovider.PaymentProviderVm;
import org.mss.payment.viewmodel.paymentprovider.UpdatePaymentVm;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UpdatePaymentProviderMapper extends
    EntityCreateUpdateMapper<PaymentProvider, UpdatePaymentVm, PaymentProviderVm> {
}