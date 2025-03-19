package org.mss.location.controller;

import org.mss.location.model.Country;
import org.mss.location.service.CountryService;
import org.mss.location.utils.Constants;
import org.mss.location.viewmodel.country.CountryListGetVm;
import org.mss.location.viewmodel.country.CountryPostVm;
import org.mss.location.viewmodel.country.CountryVm;
import org.mss.location.viewmodel.error.ErrorVm;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping(Constants.ApiConstant.COUNTRIES_URL)
public class CountryController {

    private final CountryService countryService;

    public CountryController(CountryService countryService) {
        this.countryService = countryService;
    }

    @GetMapping("/paging")
    public ResponseEntity<CountryListGetVm> getPageableCountries(
        @RequestParam(value = "pageNo", defaultValue = Constants.PageableConstant.DEFAULT_PAGE_NUMBER, required = false)
        final int pageNo,
        @RequestParam(value = "pageSize", defaultValue = Constants.PageableConstant.DEFAULT_PAGE_SIZE, required = false)
        final int pageSize) {
        return ResponseEntity.ok(countryService.getPageableCountries(pageNo, pageSize));
    }

    @GetMapping
    public ResponseEntity<List<CountryVm>> listCountries() {
        return ResponseEntity.ok(countryService.findAllCountries());
    }

    @GetMapping("/{id}")
    @ApiResponses(value = {
        @ApiResponse(responseCode = Constants.ApiConstant.CODE_200, description = Constants.ApiConstant.OK,
            content = @Content(schema = @Schema(implementation = CountryVm.class))),
        @ApiResponse(responseCode = Constants.ApiConstant.CODE_404, description = Constants.ApiConstant.NOT_FOUND,
            content = @Content(schema = @Schema(implementation = ErrorVm.class)))})
    public ResponseEntity<CountryVm> getCountry(@PathVariable("id") final Long id) {
        return ResponseEntity.ok(countryService.findById(id));
    }

    @PostMapping
    @ApiResponses(value = {
        @ApiResponse(responseCode = Constants.ApiConstant.CODE_201, description = Constants.ApiConstant.CREATED,
            content = @Content(schema = @Schema(implementation = CountryVm.class))),
        @ApiResponse(responseCode = Constants.ApiConstant.CODE_400, description = Constants.ApiConstant.BAD_REQUEST,
            content = @Content(schema = @Schema(implementation = ErrorVm.class)))})
    public ResponseEntity<CountryVm> createCountry(
        @Valid @RequestBody final CountryPostVm countryPostVm,
        final UriComponentsBuilder uriComponentsBuilder) {
        final Country country = countryService.create(countryPostVm);
        return ResponseEntity.created(
                uriComponentsBuilder
                    .replacePath("/countries/{id}")
                    .buildAndExpand(country.getId())
                    .toUri())
            .body(CountryVm.fromModel(country));
    }

    @PutMapping("/{id}")
    @ApiResponses(value = {
        @ApiResponse(responseCode = Constants.ApiConstant.CODE_204, description = Constants.ApiConstant.NO_CONTENT,
            content = @Content()),
        @ApiResponse(responseCode = Constants.ApiConstant.CODE_404, description = Constants.ApiConstant.NOT_FOUND,
            content = @Content(schema = @Schema(implementation = ErrorVm.class))),
        @ApiResponse(responseCode = Constants.ApiConstant.CODE_400, description = Constants.ApiConstant.BAD_REQUEST,
            content = @Content(schema = @Schema(implementation = ErrorVm.class)))})
    public ResponseEntity<Void> updateCountry(@PathVariable final Long id,
                                              @Valid @RequestBody final CountryPostVm countryPostVm) {
        countryService.update(countryPostVm, id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    @ApiResponses(value = {
        @ApiResponse(responseCode = Constants.ApiConstant.CODE_204, description = Constants.ApiConstant.NO_CONTENT,
            content = @Content()),
        @ApiResponse(responseCode = Constants.ApiConstant.CODE_404, description = Constants.ApiConstant.NOT_FOUND,
            content = @Content(schema = @Schema(implementation = ErrorVm.class))),
        @ApiResponse(responseCode = Constants.ApiConstant.CODE_400, description = Constants.ApiConstant.BAD_REQUEST,
            content = @Content(schema = @Schema(implementation = ErrorVm.class)))})
    public ResponseEntity<Void> deleteCountry(@PathVariable(name = "id") final Long id) {
        countryService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
