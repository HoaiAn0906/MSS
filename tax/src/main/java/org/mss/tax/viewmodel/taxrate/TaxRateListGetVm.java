package org.mss.tax.viewmodel.taxrate;

import java.util.List;

public record TaxRateListGetVm(
    List<TaxRateGetDetailVm> taxRateGetDetailContent,
    int pageNo,
    int pageSize,
    int totalElements,
    int totalPages,
    boolean isLast
) {

}
