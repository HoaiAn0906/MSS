package org.mss.product.viewmodel.productoption;

import org.mss.product.model.ProductOption;

public record ProductOptionGetVm(Long id, String name) {
    public static ProductOptionGetVm fromModel(ProductOption productOption) {
        return new ProductOptionGetVm(productOption.getId(), productOption.getName());
    }
}
