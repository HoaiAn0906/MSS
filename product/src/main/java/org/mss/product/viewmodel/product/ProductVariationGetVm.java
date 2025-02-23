package org.mss.product.viewmodel.product;

import org.mss.product.viewmodel.ImageVm;

import java.util.List;
import java.util.Map;

public record ProductVariationGetVm(
        Long id,
        String name,
        String slug,
        String sku,
        String gtin,
        Double price,
        ImageVm thumbnail,
        List<ImageVm> productImages,
        Map<Long, String> options
) {
}
