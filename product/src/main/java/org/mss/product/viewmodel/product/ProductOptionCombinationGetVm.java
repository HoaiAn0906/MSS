package org.mss.product.viewmodel.product;

import org.mss.product.model.ProductOptionCombination;

public record ProductOptionCombinationGetVm(
        Long id,
        Long productOptionId,
        String productOptionValue,
        String productOptionName
) {
    public static ProductOptionCombinationGetVm fromModel(ProductOptionCombination productOptionCombination) {
        return new ProductOptionCombinationGetVm(
                productOptionCombination.getId(),
                productOptionCombination.getProductOption().getId(),
                productOptionCombination.getValue(),
                productOptionCombination.getProductOption().getName()
        );
    }
}
