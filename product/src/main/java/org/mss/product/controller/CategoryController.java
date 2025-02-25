package org.mss.product.controller;

import lombok.extern.slf4j.Slf4j;
import org.mss.commonlibrary.exception.BadRequestException;
import org.mss.product.constants.PageableConstant;
import org.mss.product.model.Category;
import org.mss.product.repository.CategoryRepository;
import org.mss.product.service.CategoryService;
import org.mss.product.utils.Constants;
import org.mss.product.viewmodel.category.CategoryGetDetailVm;
import org.mss.product.viewmodel.category.CategoryGetVm;
import org.mss.product.viewmodel.category.CategoryPostVm;
import org.mss.product.viewmodel.error.ErrorVm;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import java.security.Principal;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

@Slf4j
@RestController
public class CategoryController {
    private final CategoryRepository categoryRepository;
    private final CategoryService categoryService;

    public CategoryController(CategoryRepository categoryRepository, CategoryService categoryService) {
        this.categoryRepository = categoryRepository;
        this.categoryService = categoryService;
    }

    @GetMapping({"/backoffice/categories", "/storefront/categories"})
    public ResponseEntity<List<CategoryGetVm>> listCategories(
            @RequestParam(required = false, defaultValue = "") String categoryName) {
        return ResponseEntity.ok(categoryService.getCategories(categoryName));
    }

    @GetMapping("/backoffice/categories/{id}")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Ok",
            content = @Content(schema = @Schema(implementation = CategoryGetDetailVm.class))),
        @ApiResponse(responseCode = "404", description = "Not found",
            content = @Content(schema = @Schema(implementation = ErrorVm.class)))
    })
    public ResponseEntity<CategoryGetDetailVm> getCategory(@PathVariable Long id) {
        return ResponseEntity.ok(categoryService.getCategoryById(id));
    }

    @PostMapping("/backoffice/categories")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Created",
            content = @Content(schema = @Schema(implementation = CategoryGetDetailVm.class))),
        @ApiResponse(responseCode = "400", description = "Bad request",
            content = @Content(schema = @Schema(implementation = ErrorVm.class)))})
    public ResponseEntity<CategoryGetDetailVm> createCategory(
            @Valid @RequestBody CategoryPostVm categoryPostVm,
            UriComponentsBuilder uriComponentsBuilder
    ) {
        Category savedCategory = categoryService.create(categoryPostVm);

        CategoryGetDetailVm categoryGetDetailVm = CategoryGetDetailVm.fromModel(savedCategory);
        return ResponseEntity.created(uriComponentsBuilder.replacePath("/categories/{id}")
            .buildAndExpand(savedCategory.getId()).toUri())
                .body(categoryGetDetailVm);
    }

    @PutMapping("/backoffice/categories/{id}")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "No content"),
        @ApiResponse(responseCode = "404", description = "Not found",
            content = @Content(schema = @Schema(implementation = ErrorVm.class))),
        @ApiResponse(responseCode = "400", description = "Bad request",
            content = @Content(schema = @Schema(implementation = ErrorVm.class)))})
    public ResponseEntity<Void> updateCategory(
            @PathVariable Long id,
            @RequestBody @Valid final CategoryPostVm categoryPostVm
    ) {
        log.info("Update categor: {}", categoryPostVm);
        categoryService.update(categoryPostVm, id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/backoffice/categories/{id}")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "No content"),
        @ApiResponse(responseCode = "404", description = "Not found",
            content = @Content(schema = @Schema(implementation = ErrorVm.class))),
        @ApiResponse(responseCode = "400", description = "Bad request",
            content = @Content(schema = @Schema(implementation = ErrorVm.class)))})
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new BadRequestException(Constants.ErrorCode.CATEGORY_NOT_FOUND, id));
        if (!category.getCategories().isEmpty()) {
            throw new BadRequestException(Constants.ErrorCode.MAKE_SURE_CATEGORY_DO_NOT_CONTAIN_CHILDREN);
        }
        if (!category.getProductCategories().isEmpty()) {
            throw new BadRequestException(Constants.ErrorCode.MAKE_SURE_CATEGORY_DO_NOT_CONTAIN_PRODUCT);
        }
        categoryRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/backoffice/categories/by-ids")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Ok",
            content = @Content(schema = @Schema(implementation = CategoryGetDetailVm.class))),
        @ApiResponse(responseCode = "404", description = "Not found",
            content = @Content(schema = @Schema(implementation = ErrorVm.class)))
    })
    public ResponseEntity<List<CategoryGetVm>> getCategoriesByIds(@RequestParam List<Long> ids) {
        return ResponseEntity.ok(categoryService.getCategoryByIds(ids));
    }
}
