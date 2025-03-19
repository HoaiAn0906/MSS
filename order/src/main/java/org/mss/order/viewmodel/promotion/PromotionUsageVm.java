package org.mss.order.viewmodel.promotion;

import lombok.Builder;

@Builder
public record PromotionUsageVm(
        String promotionCode,
        Long productId,
        String userId,
        Long orderId
) {
}
