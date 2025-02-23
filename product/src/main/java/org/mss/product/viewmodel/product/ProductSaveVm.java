package org.mss.product.viewmodel.product;

import org.mss.product.model.ProductVariationSaveVm;

import java.util.List;

public interface ProductSaveVm<T extends ProductVariationSaveVm> extends ProductProperties {
    List<T> variations();

    Boolean isPublished();

    Double length();

    Double width();

    @Override
    default Long id() {
        return null;
    }
}
