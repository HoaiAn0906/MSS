package org.mss.product.viewmodel.productoption;

import org.mss.product.model.ProductOptionValueSaveVm;

import java.util.List;

public record ProductOptionValuePutVm(
        Long productOptionId,
        String displayType,
        Integer displayOrder,
        List<String> value) implements ProductOptionValueSaveVm  {
}
