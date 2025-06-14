package org.mss.order.service;

import org.mss.commonlibrary.constants.ApiConstant;
import org.mss.commonlibrary.constants.MessageCode;
import org.mss.commonlibrary.exception.ForbiddenException;
import org.mss.commonlibrary.exception.NotFoundException;
import org.mss.commonlibrary.utils.AuthenticationUtils;
import org.mss.order.mapper.CheckoutMapper;
import org.mss.order.model.Checkout;
import org.mss.order.model.CheckoutItem;
import org.mss.order.model.Order;
import org.mss.order.model.enumeration.CheckoutState;
import org.mss.order.repository.CheckoutRepository;
import org.mss.order.utils.Constants;
import org.mss.order.viewmodel.checkout.*;
import org.mss.order.viewmodel.product.ProductCheckoutListVm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import static org.mss.order.utils.Constants.ErrorCode.CHECKOUT_NOT_FOUND;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CheckoutService {

    private final CheckoutRepository checkoutRepository;
    private final OrderService orderService;
    private final ProductService productService;
    private final CheckoutMapper checkoutMapper;

    /**
     * Creates a new {@link Checkout} object in a PENDING state.
     *
     * @param checkoutPostVm the view model containing checkout details and items
     * @return a {@link CheckoutVm} object representing the newly created checkout
     */
    public CheckoutVm createCheckout(CheckoutPostVm checkoutPostVm) {
        Checkout checkout = checkoutMapper.toModel(checkoutPostVm);
        checkout.setCheckoutState(CheckoutState.PENDING);
        checkout.setCustomerId(AuthenticationUtils.extractUserId());
        checkout.setCreatedBy(AuthenticationUtils.extractUserId());

        prepareCheckoutItems(checkout, checkoutPostVm);
        checkout = checkoutRepository.save(checkout);

        CheckoutVm checkoutVm = checkoutMapper.toVm(checkout);
        Set<CheckoutItemVm> checkoutItemVms = checkout.getCheckoutItems()
                .stream()
                .map(checkoutMapper::toVm)
                .collect(Collectors.toSet());
        log.info(Constants.MessageCode.CREATE_CHECKOUT, checkout.getId(), checkout.getCustomerId());
        return checkoutVm.toBuilder()
                .checkoutItemVms(checkoutItemVms)
                .build();
    }

    private void prepareCheckoutItems(Checkout checkout, CheckoutPostVm checkoutPostVm) {
        Set<Long> productIds = checkoutPostVm.checkoutItemPostVms()
                .stream()
                .map(CheckoutItemPostVm::productId)
                .collect(Collectors.toSet());

        List<CheckoutItem> checkoutItems = checkoutPostVm.checkoutItemPostVms()
                .stream()
                .map(checkoutMapper::toModel)
                .map(item -> {
                    item.setCheckout(checkout);
                    return item;
                }).toList();

        Map<Long, ProductCheckoutListVm> products
                = productService.getProductInfomation(productIds, 0, productIds.size());

        List<CheckoutItem> enrichedItems = enrichCheckoutItemsWithProductDetails(products, checkoutItems);
        BigDecimal totalAmount = enrichedItems.stream()
                .map(item -> item.getProductPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        checkout.setCheckoutItems(enrichedItems);
        checkout.setTotalAmount(totalAmount);
    }

    private List<CheckoutItem> enrichCheckoutItemsWithProductDetails(
            Map<Long, ProductCheckoutListVm> products,
            List<CheckoutItem> checkoutItems) {
        return checkoutItems.stream().map(item -> {
            ProductCheckoutListVm product = products.get(item.getProductId());
            if (product == null) {
                throw new NotFoundException(MessageCode.PRODUCT_NOT_FOUND, item.getProductId());
            }
            return item.toBuilder()
                    .productName(product.getName())
                    .productPrice(BigDecimal.valueOf(product.getPrice()))
                    .build();
        }).toList();
    }

    public CheckoutVm getCheckoutPendingStateWithItemsById(String id) {
        Checkout checkout = checkoutRepository.findByIdAndCheckoutState(id, CheckoutState.PENDING).orElseThrow(()
                -> new NotFoundException(CHECKOUT_NOT_FOUND, id));

        System.out.println("Checkout: " + checkout);

        if (isNotOwnedByCurrentUser(checkout)) {
            throw new ForbiddenException(ApiConstant.FORBIDDEN, "You can not view this checkout");
        }

        CheckoutVm checkoutVm = checkoutMapper.toVm(checkout);

        List<CheckoutItem> checkoutItems = checkout.getCheckoutItems();
        if (CollectionUtils.isEmpty(checkoutItems)) {
            return checkoutVm;
        }

        Set<CheckoutItemVm> checkoutItemVms = checkoutItems
                .stream()
                .map(checkoutMapper::toVm)
                .collect(Collectors.toSet());

        return checkoutVm.toBuilder().checkoutItemVms(checkoutItemVms).build();
    }

    public Long updateCheckoutStatus(CheckoutStatusPutVm checkoutStatusPutVm) {
        Checkout checkout = checkoutRepository.findById(checkoutStatusPutVm.checkoutId())
                .orElseThrow(() -> new NotFoundException(CHECKOUT_NOT_FOUND, checkoutStatusPutVm.checkoutId()));

        if (isNotOwnedByCurrentUser(checkout)) {
            throw new ForbiddenException(ApiConstant.FORBIDDEN, "You are not authorized to update this checkout");
        }

        checkout.setCheckoutState(CheckoutState.valueOf(checkoutStatusPutVm.checkoutStatus()));
        checkoutRepository.save(checkout);
        log.info(Constants.MessageCode.UPDATE_CHECKOUT_STATUS,
                checkout.getId(),
                checkoutStatusPutVm.checkoutStatus(),
                checkout.getCheckoutState()
        );
        Order order = orderService.findOrderByCheckoutId(checkoutStatusPutVm.checkoutId());
        return order.getId();
    }

    public void updateCheckoutPaymentMethod(String id, CheckoutPaymentMethodPutVm checkoutPaymentMethodPutVm) {
        Checkout checkout = checkoutRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(CHECKOUT_NOT_FOUND, id));
        checkout.setPaymentMethodId(checkoutPaymentMethodPutVm.paymentMethodId());
        log.info(Constants.MessageCode.UPDATE_CHECKOUT_PAYMENT,
                checkout.getId(),
                checkoutPaymentMethodPutVm.paymentMethodId(),
                checkout.getPaymentMethodId()
        );
        checkoutRepository.save(checkout);
    }

    private boolean isNotOwnedByCurrentUser(Checkout checkout) {
        return !checkout.getCreatedBy().equals(AuthenticationUtils.extractUserId());
    }
}