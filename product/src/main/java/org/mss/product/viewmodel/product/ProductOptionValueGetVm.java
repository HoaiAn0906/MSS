package org.mss.product.viewmodel.product;

import org.mss.product.model.ProductOptionValue;

public record ProductOptionValueGetVm(
        Long id,
        Long productOptionId,
        String productOptionValue,
        String displayType,
        String productOptionName,
        int displayOrder
) {
    public static ProductOptionValueGetVm fromModel(ProductOptionValue productOptionValue) {
        return new ProductOptionValueGetVm(
                productOptionValue.getId(),
                productOptionValue.getProductOption().getId(),
                productOptionValue.getValue(),
                productOptionValue.getDisplayType(),
                productOptionValue.getProductOption().getName(),
                productOptionValue.getDisplayOrder()
        );
    }
}
