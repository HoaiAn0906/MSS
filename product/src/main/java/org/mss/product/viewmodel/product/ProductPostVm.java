package org.mss.product.viewmodel.product;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.mss.product.model.enumeration.DimensionUnit;
import org.mss.product.validation.ValidateProductPrice;
import org.mss.product.viewmodel.productoption.ProductOptionValuePostVm;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonSerialize
public record ProductPostVm(
        @NotBlank String name,
        @NotBlank String slug,
        Long brandId,
        List<Long> categoryIds,
        String shortDescription,
        String description,
        String specification,
        String sku,
        String gtin,
        Double weight,
        DimensionUnit dimensionUnit,
        Double length,
        Double width,
        Double height,
        @ValidateProductPrice Double price,
        Boolean isAllowedToOrder,
        Boolean isPublished,
        Boolean isFeatured,
        Boolean isVisibleIndividually,
        Boolean stockTrackingEnabled,
        String metaTitle,
        String metaKeyword,
        String metaDescription,
        Long thumbnailMediaId,
        List<Long> productImageIds,
        List<ProductVariationPostVm> variations,
        List<ProductOptionValuePostVm> productOptionValues,
        List<ProductOptionValueDisplay> productOptionValueDisplays,
        List<Long> relatedProductIds,
        Long taxClassId) implements ProductSaveVm<ProductVariationPostVm> {
}
