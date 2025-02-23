package org.mss.product.viewmodel.productattribute;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.mss.product.model.attribute.ProductAttributeGroup;
import jakarta.validation.constraints.NotBlank;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonSerialize
public record ProductAttributeGroupPostVm(@NotBlank String name) {

    public ProductAttributeGroup toModel() {
        ProductAttributeGroup productAttributeGroup = new ProductAttributeGroup();
        productAttributeGroup.setName(name);
        return productAttributeGroup;
    }
}
