package org.mss.product.viewmodel.productattribute;

import org.mss.product.model.attribute.ProductAttribute;

public record ProductAttributeVm(Long id, String name) {
    public static ProductAttributeVm fromModel(ProductAttribute productAttribute) {
        return new ProductAttributeVm(productAttribute.getId(), productAttribute.getName());
    }
}
