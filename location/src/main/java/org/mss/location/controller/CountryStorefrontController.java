package org.mss.location.controller;

import org.mss.location.service.CountryService;
import org.mss.location.utils.Constants;
import org.mss.location.viewmodel.country.CountryVm;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(Constants.ApiConstant.COUNTRIES_STOREFRONT_URL)
@RequiredArgsConstructor
public class CountryStorefrontController {
    private final CountryService countryService;

    @GetMapping
    public ResponseEntity<List<CountryVm>> listCountries() {
        return ResponseEntity.ok(countryService.findAllCountries());
    }
}
