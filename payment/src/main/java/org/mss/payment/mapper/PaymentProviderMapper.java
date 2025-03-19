package org.mss.payment.mapper;

import org.mss.commonlibrary.mapper.BaseMapper;
import org.mss.payment.model.PaymentProvider;
import org.mss.payment.viewmodel.paymentprovider.PaymentProviderVm;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PaymentProviderMapper extends BaseMapper<PaymentProvider, PaymentProviderVm> {
}