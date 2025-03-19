package org.mss.order.service;

import org.mss.order.config.ServiceUrlConfig;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@Service
@RequiredArgsConstructor
public class TaxService extends AbstractCircuitBreakFallbackHandler {
    private final RestClient webClient;
    private final ServiceUrlConfig serviceUrlConfig;

    @Retry(name = "restApi")
    @CircuitBreaker(name = "restCircuitBreaker", fallbackMethod = "handleDoubleFallback")
    public Double getTaxPercentByAddress(Long taxClassId, Long countryId, Long stateOrProvinceId, String zipCode) {
        final URI url = UriComponentsBuilder.fromHttpUrl(serviceUrlConfig.tax())
            .path("/backoffice/tax-rates/tax-percent")
                .queryParam("taxClassId", taxClassId)
                .queryParam("countryId", countryId)
                .queryParam("stateOrProvinceId", stateOrProvinceId)
                .queryParam("zipCode", zipCode)
                .build().toUri();

        final String jwt = ((Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal())
            .getTokenValue();
        return webClient.get()
                .uri(url)
                .headers(h -> h.setBearerAuth(jwt))
                .retrieve()
                .body(Double.class);
    }

    protected Double handleDoubleFallback(Throwable throwable) throws Throwable {
        return handleTypedFallback(throwable);
    }
}
