package org.mss.product.viewmodel.productattribute;

import org.mss.product.model.attribute.ProductAttributeValue;

public record ProductAttributeValueGetVm(long id, String nameProductAttribute, String value) {
    public static ProductAttributeValueGetVm fromModel(ProductAttributeValue productAttributeValue) {
        return new ProductAttributeValueGetVm(
                productAttributeValue.getId(),
                productAttributeValue.getProductAttribute().getName(),
                productAttributeValue.getValue()
        );
    }
}