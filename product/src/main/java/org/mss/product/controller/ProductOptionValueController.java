package org.mss.product.controller;

import org.mss.commonlibrary.exception.NotFoundException;
import org.mss.product.model.Product;
import org.mss.product.repository.ProductOptionValueRepository;
import org.mss.product.repository.ProductRepository;
import org.mss.product.utils.Constants;
import org.mss.product.viewmodel.error.ErrorVm;
import org.mss.product.viewmodel.product.ProductOptionValueGetVm;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductOptionValueController {
    private final ProductOptionValueRepository productOptionValueRepository;
    private final ProductRepository productRepository;

    public ProductOptionValueController(
        ProductOptionValueRepository productOptionValueRepository,
        ProductRepository productRepository
    ) {
        this.productOptionValueRepository = productOptionValueRepository;
        this.productRepository = productRepository;
    }

    @GetMapping({"/backoffice/product-option-values"})
    public ResponseEntity<List<org.mss.product.viewmodel.productoption.ProductOptionValueGetVm>>
        listProductOptionValues() {
        List<org.mss.product.viewmodel.productoption.ProductOptionValueGetVm> productOptionGetVms
            = productOptionValueRepository
            .findAll().stream()
            .map(org.mss.product.viewmodel.productoption.ProductOptionValueGetVm::fromModel)
            .toList();
        return ResponseEntity.ok(productOptionGetVms);
    }

    @GetMapping({"/storefront/product-option-values/{productId}"})
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "OK",
            content = @Content(schema = @Schema(
                implementation = org.mss.product.viewmodel.productoption.ProductOptionValueGetVm.class))),
        @ApiResponse(responseCode = "404", description = "Not found",
            content = @Content(schema = @Schema(implementation = ErrorVm.class))),
    })
    public ResponseEntity<List<ProductOptionValueGetVm>> listProductOptionValueOfProduct(
        @PathVariable("productId") Long productId
    ) {
        Product product = productRepository
            .findById(productId)
            .orElseThrow(() -> new NotFoundException(Constants.ErrorCode.PRODUCT_NOT_FOUND, productId));
        List<ProductOptionValueGetVm> productVariations = productOptionValueRepository
            .findAllByProduct(product).stream()
            .map(ProductOptionValueGetVm::fromModel)
            .toList();
        return ResponseEntity.ok(productVariations);
    }
}
