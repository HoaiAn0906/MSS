package org.mss.product.viewmodel.product;

import org.mss.product.model.Category;
import org.mss.product.model.enumeration.DimensionUnit;
import org.mss.product.viewmodel.ImageVm;
import lombok.Builder;

import java.util.List;

@Builder(toBuilder = true)
public record ProductDetailVm(
        long id,
        String name,
        String shortDescription,
        String description,
        String specification,
        String sku,
        String gtin,
        String slug,
        Boolean isAllowedToOrder,
        Boolean isPublished,
        Boolean isFeatured,
        Boolean isVisible,
        Boolean stockTrackingEnabled,
        Double weight,
        DimensionUnit dimensionUnit,
        Double length,
        Double width,
        Double height,
        Double price,
        Long brandId,
        List<Category> categories,
        String metaTitle,
        String metaKeyword,
        String metaDescription,
        ImageVm thumbnailMedia,
        List<ImageVm> productImageMedias,
        Long taxClassId,
        Long parentId) {
}
