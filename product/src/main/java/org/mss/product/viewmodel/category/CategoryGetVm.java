package org.mss.product.viewmodel.category;

import org.mss.product.model.Category;
import org.mss.product.viewmodel.ImageVm;

public record CategoryGetVm(long id, String name, String slug, long parentId, ImageVm categoryImage) {
    public static CategoryGetVm fromModel(Category category) {
        Category parent = category.getParent();
        long parentId = parent == null ? -1 : parent.getId();
        return new CategoryGetVm(category.getId(), category.getName(), category.getSlug(), parentId, null);
    }
}