package org.mss.product.viewmodel.product;

import org.mss.product.model.ProductVariationSaveVm;

import java.util.List;
import java.util.Map;

public record ProductVariationPostVm(
        String name,
        String slug,
        String sku,
        String gtin,
        Double price,
        Long thumbnailMediaId,
        List<Long> productImageIds,
        Map<Long, String> optionValuesByOptionId
) implements ProductVariationSaveVm {

    @Override
    public Long id() {
        return null;
    }
}
