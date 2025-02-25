package org.mss.product.viewmodel.productattribute;

import org.mss.product.model.attribute.ProductAttribute;

public record ProductAttributeGetVm(long id, String name, String productAttributeGroup) {

    public static ProductAttributeGetVm fromModel(ProductAttribute productAttribute) {
        if (productAttribute.getProductAttributeGroup() != null) {
            return new ProductAttributeGetVm(
                    productAttribute.getId(),
                    productAttribute.getName(),
                    productAttribute.getProductAttributeGroup().getName()
            );
        } else {
            return new ProductAttributeGetVm(
                    productAttribute.getId(),
                    productAttribute.getName(),
                    null
            );
        }
    }
}
