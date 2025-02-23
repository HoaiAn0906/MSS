package org.mss.product.controller;

import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.mss.commonlibrary.exception.NotFoundException;
import org.mss.product.constants.PageableConstant;
import org.mss.product.model.Brand;
import org.mss.product.repository.BrandRepository;
import org.mss.product.service.BrandService;
import org.mss.product.utils.Constants;
import org.mss.product.viewmodel.brand.BrandListGetVm;
import org.mss.product.viewmodel.brand.BrandPostVm;
import org.mss.product.viewmodel.brand.BrandVm;
import org.mss.product.viewmodel.error.ErrorVm;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
public class BrandController {
    
    private final BrandService brandService;
    private final BrandRepository brandRepository;

    public BrandController(BrandService brandService, BrandRepository brandRepository) {
        this.brandService = brandService;
        this.brandRepository = brandRepository;
    }

    @GetMapping({"/backoffice/brands", "/storefront/brands"})
    public ResponseEntity<List<BrandVm>> listBrands(
            @RequestParam(required = false, defaultValue = "") String brandName) {
        List<BrandVm> brandVms = brandRepository.findByNameContainingIgnoreCase(brandName).stream()
                .map(BrandVm::fromModel)
                .toList();
        return ResponseEntity.ok(brandVms);
    }

    @GetMapping({"/backoffice/brands/paging", "/storefront/brands/paging"})
    public ResponseEntity<BrandListGetVm> getPageableBrands(
        @RequestParam(value = "pageNo", defaultValue = PageableConstant.DEFAULT_PAGE_NUMBER, required = false)
        int pageNo,
        @RequestParam(value = "pageSize", defaultValue = PageableConstant.DEFAULT_PAGE_SIZE, required = false)
        int pageSize
    ) {

        return ResponseEntity.ok(brandService.getBrands(pageNo, pageSize));
    }

    @GetMapping("/backoffice/brands/{id}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok",
                    content = @Content(schema = @Schema(implementation = BrandVm.class))),
            @ApiResponse(responseCode = "404", description = "Not found",
                    content = @Content(schema = @Schema(implementation = ErrorVm.class)))})
    public ResponseEntity<BrandVm> getBrand(@PathVariable("id") Long id) {
        Brand brand = brandRepository
                .findById(id)
                .orElseThrow(() -> new NotFoundException(Constants.ErrorCode.BRAND_NOT_FOUND, id));
        return ResponseEntity.ok(BrandVm.fromModel(brand));
    }
    
    @PostMapping("/backoffice/brands")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Created",
                    content = @Content(schema = @Schema(implementation = BrandVm.class))),
            @ApiResponse(responseCode = "400", description = "Bad request",
                    content = @Content(schema = @Schema(implementation = ErrorVm.class)))})
    public ResponseEntity<BrandVm> createBrand(
            @Valid @RequestBody BrandPostVm brandPostVm,
            UriComponentsBuilder uriComponentsBuilder
    ) {
        Brand brand = brandService.create(brandPostVm);
        return ResponseEntity.created(uriComponentsBuilder.replacePath("/brands/{id}")
                        .buildAndExpand(brand.getId()).toUri())
                .body(BrandVm.fromModel(brand));
    }

    @PutMapping("/backoffice/brands/{id}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "No content", content = @Content()),
            @ApiResponse(responseCode = "404", description = "Not found",
                    content = @Content(schema = @Schema(implementation = ErrorVm.class))),
            @ApiResponse(responseCode = "400", description = "Bad request",
                    content = @Content(schema = @Schema(implementation = ErrorVm.class)))})
    public ResponseEntity<Void> updateBrand(@PathVariable Long id, @Valid @RequestBody final BrandPostVm brandPostVm) {
        brandService.update(brandPostVm, id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/backoffice/brands/{id}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "No content", content = @Content()),
            @ApiResponse(responseCode = "404", description = "Not found",
                    content = @Content(schema = @Schema(implementation = ErrorVm.class))),
            @ApiResponse(responseCode = "400", description = "Bad request",
                    content = @Content(schema = @Schema(implementation = ErrorVm.class)))})
    public ResponseEntity<Void> deleteBrand(@PathVariable long id) {
        brandService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
