package org.mss.tax.viewmodel.taxrate;

import org.mss.tax.model.TaxRate;

public record TaxRateVm(Long id, Double rate, String zipCode, Long taxClassId, Long stateOrProvinceId, Long countryId) {

    public static TaxRateVm fromModel(TaxRate taxRate) {
        return new TaxRateVm(taxRate.getId(), taxRate.getRate(), taxRate.getZipCode(),
            taxRate.getTaxClass().getId(), taxRate.getStateOrProvinceId(), taxRate.getCountryId());
    }
}
