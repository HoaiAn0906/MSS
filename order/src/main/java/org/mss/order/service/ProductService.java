package org.mss.order.service;

import org.mss.commonlibrary.exception.NotFoundException;
import org.mss.commonlibrary.utils.AuthenticationUtils;
import org.mss.order.config.ServiceUrlConfig;
import org.mss.order.viewmodel.order.OrderItemVm;
import org.mss.order.viewmodel.order.OrderVm;
import org.mss.order.viewmodel.product.ProductCheckoutListVm;
import org.mss.order.viewmodel.product.ProductGetCheckoutListVm;
import org.mss.order.viewmodel.product.ProductQuantityItem;
import org.mss.order.viewmodel.product.ProductVariationVm;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.RequiredArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService extends AbstractCircuitBreakFallbackHandler {

    private final RestClient restClient;
    private final ServiceUrlConfig serviceUrlConfig;

    @Retry(name = "restApi")
    @CircuitBreaker(name = "restCircuitBreaker", fallbackMethod = "handleProductVariationListFallback")
    public List<ProductVariationVm> getProductVariations(Long productId) {
        final String jwt = AuthenticationUtils.extractJwt();

        final URI url = UriComponentsBuilder
                .fromHttpUrl(serviceUrlConfig.product())
                .path("/backoffice/product-variations/${productId}")
                .buildAndExpand(productId)
                .toUri();

        return restClient.get()
                .uri(url)
                .headers(h -> h.setBearerAuth(jwt))
                .retrieve()
                .toEntity(new ParameterizedTypeReference<List<ProductVariationVm>>() {
                })
                .getBody();
    }

    @Retry(name = "restApi")
    @CircuitBreaker(name = "restCircuitBreaker", fallbackMethod = "handleBodilessFallback")
    public void subtractProductStockQuantity(OrderVm orderVm) {
        final String jwt = AuthenticationUtils.extractJwt();

        final URI url = UriComponentsBuilder
                .fromHttpUrl(serviceUrlConfig.product())
                .path("/backoffice/products/subtract-quantity")
                .buildAndExpand()
                .toUri();

        restClient.put()
                .uri(url)
                .headers(h -> h.setBearerAuth(jwt))
                .body(buildProductQuantityItems(orderVm.orderItemVms()))
                .retrieve();
    }

    @Retry(name = "restApi")
    @CircuitBreaker(name = "restCircuitBreaker", fallbackMethod = "handleProductInfomationFallback")
    public Map<Long, ProductCheckoutListVm> getProductInfomation(Set<Long> ids, int pageNo, int pageSize) {
        final String jwt = AuthenticationUtils.extractJwt();

        final URI url = UriComponentsBuilder
                .fromHttpUrl(serviceUrlConfig.product())
                .path("/products")
                .queryParam("ids", ids)
                .queryParam("pageNo", pageNo)
                .queryParam("pageSize", pageSize)
                .buildAndExpand()
                .toUri();

        ProductGetCheckoutListVm response = restClient.get()
                .uri(url)
                .headers(h -> h.setBearerAuth(jwt))
                .retrieve()
                .toEntity(new ParameterizedTypeReference<ProductGetCheckoutListVm>() {
                })
                .getBody();

        if (response == null || response.productCheckoutListVms() == null) {
            throw new NotFoundException("PRODUCT_NOT_FOUND");
        } else {
            return response.productCheckoutListVms()
                    .stream()
                    .collect(Collectors.toMap(ProductCheckoutListVm::getId, Function.identity()));
        }
    }

    private List<ProductQuantityItem> buildProductQuantityItems(Set<OrderItemVm> orderItems) {
        return orderItems.stream()
                .map(orderItem
                        -> ProductQuantityItem
                        .builder()
                        .productId(orderItem.productId())
                        .quantity(Long.valueOf(orderItem.quantity()))
                        .build()
                ).toList();
    }

    protected List<ProductVariationVm> handleProductVariationListFallback(Throwable throwable) throws Throwable {
        return handleTypedFallback(throwable);
    }

    protected Map<Long, ProductCheckoutListVm> handleProductInfomationFallback(Throwable throwable) throws Throwable {
        return handleTypedFallback(throwable);
    }
}
