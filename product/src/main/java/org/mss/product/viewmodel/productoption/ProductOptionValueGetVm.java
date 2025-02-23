package org.mss.product.viewmodel.productoption;


import org.mss.product.model.ProductOption;
import org.mss.product.model.ProductOptionValue;

public record ProductOptionValueGetVm(Long id, Long productId, ProductOption productOption, String displayType,
                                      int displayOrder, String value) {
    public static ProductOptionValueGetVm fromModel(ProductOptionValue productOptionValue) {
        return new ProductOptionValueGetVm(
                productOptionValue.getId(),
                productOptionValue.getProduct().getId(),
                productOptionValue.getProductOption(),
                productOptionValue.getDisplayType(),
                productOptionValue.getDisplayOrder(),
                productOptionValue.getValue()
        );
    }
}
