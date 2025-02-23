package org.mss.product.viewmodel.product;

import org.mss.product.model.ProductOptionValueSaveVm;
import lombok.Builder;

@Builder(toBuilder = true)
public record ProductOptionValueDisplay(
        Long productOptionId,
        String displayType,
        Integer displayOrder,
        String value) implements ProductOptionValueSaveVm {
}
