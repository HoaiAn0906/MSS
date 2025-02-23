package org.mss.product.model;

import org.mss.product.viewmodel.product.ProductProperties;

import java.util.List;
import java.util.Map;

public interface ProductVariationSaveVm extends ProductProperties {
    Double price();

    Long thumbnailMediaId();

    List<Long> productImageIds();

    Map<Long, String> optionValuesByOptionId();
}