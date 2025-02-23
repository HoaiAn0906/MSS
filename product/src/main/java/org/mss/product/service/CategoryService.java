package org.mss.product.service;

import java.util.ArrayList;
import java.util.List;

import lombok.extern.slf4j.Slf4j;
import org.mss.commonlibrary.exception.BadRequestException;
import org.mss.commonlibrary.exception.DuplicatedException;
import org.mss.commonlibrary.exception.NotFoundException;
import org.mss.product.model.Category;
import org.mss.product.repository.CategoryRepository;
import org.mss.product.utils.Constants;
import org.mss.product.viewmodel.ImageVm;
import org.mss.product.viewmodel.category.CategoryGetDetailVm;
import org.mss.product.viewmodel.category.CategoryGetVm;
import org.mss.product.viewmodel.category.CategoryPostVm;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class CategoryService {
    
    private final CategoryRepository categoryRepository;
    private final MediaService mediaService;
    
    public CategoryService(CategoryRepository categoryRepository, MediaService mediaService) {
        this.categoryRepository = categoryRepository;
        this.mediaService = mediaService;
    }

    public List<CategoryGetVm> getCategories(String categoryName) {
        List<Category> category = categoryRepository.findByNameContainingIgnoreCase(categoryName);
        List<CategoryGetVm> categoryGetVms = new ArrayList<>();
        category.forEach(cate -> {
            ImageVm categoryImage = null;
            if (cate.getImageId() != null) {
                categoryImage = new ImageVm(cate.getImageId(), mediaService.getMedia(cate.getImageId()).url());
            }
            Category parent = cate.getParent();
            long parentId = parent == null ? -1 : parent.getId();
            CategoryGetVm categoryGetVm = new CategoryGetVm(
                    cate.getId(),
                    cate.getName(),
                    cate.getSlug(),
                    parentId,
                    categoryImage
            );
            categoryGetVms.add(categoryGetVm);
        });
        return categoryGetVms;
    }

    public CategoryGetDetailVm getCategoryById(Long id) {
        Category category = categoryRepository
            .findById(id)
            .orElseThrow(() -> new NotFoundException(Constants.ErrorCode.CATEGORY_NOT_FOUND, id));
        ImageVm categoryImage = null;
        if (category.getImageId() != null) {
            categoryImage = new ImageVm(category.getImageId(), mediaService.getMedia(category.getImageId()).url());
        }
        Category parentCategory = category.getParent();
        Long parentId = 0L;
        if (parentCategory != null) {
            parentId = parentCategory.getId();
        }
        return new CategoryGetDetailVm(
            category.getId(),
            category.getName(),
            category.getSlug(),
            category.getDescription(),
            parentId,
            category.getMetaKeyword(),
            category.getMetaDescription(),
            category.getDisplayOrder(),
            category.getIsPublished(),
            categoryImage
        );
    }

    public Category create(CategoryPostVm categoryPostVm) {
        validateDuplicateName(categoryPostVm.name(), null);
        Category category = new Category();
        category.setName(categoryPostVm.name());
        category.setSlug(categoryPostVm.slug());
        category.setDescription(categoryPostVm.description());
        category.setDisplayOrder(categoryPostVm.displayOrder());
        category.setMetaDescription(categoryPostVm.metaDescription());
        category.setMetaKeyword(categoryPostVm.metaKeywords());
        category.setIsPublished(categoryPostVm.isPublish());
        category.setImageId(categoryPostVm.imageId());
        if (categoryPostVm.parentId() != null) {
            Category parentCategory = categoryRepository
                .findById(categoryPostVm.parentId())
                .orElseThrow(() -> new BadRequestException(
                    Constants.ErrorCode.PARENT_CATEGORY_NOT_FOUND, categoryPostVm.parentId()));
            category.setParent(parentCategory);
        }

        return categoryRepository.save(category);
    }

    public void update(CategoryPostVm categoryPostVm, Long id) {
        validateDuplicateName(categoryPostVm.name(), id);
        Category category = categoryRepository
            .findById(id)
            .orElseThrow(() -> new NotFoundException(Constants.ErrorCode.CATEGORY_NOT_FOUND, id));
        category.setName(categoryPostVm.name());
        category.setSlug(categoryPostVm.slug());
        category.setDescription(categoryPostVm.description());
        category.setDisplayOrder(categoryPostVm.displayOrder());
        category.setMetaDescription(categoryPostVm.metaDescription());
        category.setMetaKeyword(categoryPostVm.metaKeywords());
        category.setIsPublished(categoryPostVm.isPublish());
        category.setImageId(categoryPostVm.imageId());
        if (categoryPostVm.parentId() == null) {
            category.setParent(null);
        } else {
            Category parentCategory = categoryRepository
                .findById(categoryPostVm.parentId())
                .orElseThrow(() -> new BadRequestException(
                    Constants.ErrorCode.PARENT_CATEGORY_NOT_FOUND, categoryPostVm.parentId()));

            if (!checkParent(category.getId(), parentCategory)) {
                throw new BadRequestException(Constants.ErrorCode.PARENT_CATEGORY_CANNOT_BE_ITSELF);
            }
            category.setParent(parentCategory);
        }
        log.info("Update category: {}", category);
        categoryRepository.save(category);
    }

    public List<CategoryGetVm> getCategoryByIds(List<Long> ids) {
        return categoryRepository.findAllById(ids).stream().map(CategoryGetVm::fromModel).toList();
    }

    private void validateDuplicateName(String name, Long id) {
        if (checkExistedName(name, id)) {
            throw new DuplicatedException(Constants.ErrorCode.NAME_ALREADY_EXITED, name);
        }
    }

    private boolean checkExistedName(String name, Long id) {
        return categoryRepository.findExistedName(name, id) != null;
    }

    private boolean checkParent(Long id, Category category) {
        if (id.equals(category.getId())) {
            return false;
        }
        if (category.getParent() != null) {
            return checkParent(id, category.getParent());
        } else {
            return true;
        }
    }
}
