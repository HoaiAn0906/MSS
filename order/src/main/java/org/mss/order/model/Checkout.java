package org.mss.order.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.mss.commonlibrary.model.AbstractAuditEntity;
import org.mss.order.model.enumeration.CheckoutState;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "checkout")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Checkout extends AbstractAuditEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String email;

    private String note;

    @Column(name = "promotion_code")
    private String promotionCode;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private CheckoutState checkoutState;

    @SuppressWarnings("unused")
    private String progress;

    @SuppressWarnings("unused")
    private String customerId;

    @SuppressWarnings("unused")
    private String shipmentMethodId;

    @Column(name = "payment_method_id")
    private String paymentMethodId;

    @SuppressWarnings("unused")
    private Long shippingAddressId;

    @SuppressWarnings("unused")
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "last_error", columnDefinition = "jsonb")
    private String lastError;

    @SuppressWarnings("unused")
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "attributes", columnDefinition = "jsonb")
    private String attributes;

    @SuppressWarnings("unused")
    @Builder.Default
    private BigDecimal totalAmount = BigDecimal.ZERO;

    @SuppressWarnings("unused")
    @Builder.Default
    private BigDecimal totalShipmentFee = BigDecimal.ZERO;

    @SuppressWarnings("unused")
    @Builder.Default
    private BigDecimal totalShipmentTax = BigDecimal.ZERO;

    @SuppressWarnings("unused")
    private BigDecimal totalTax;

    @SuppressWarnings("unused")
    @Builder.Default
    private BigDecimal totalDiscountAmount = BigDecimal.ZERO;

    @OneToMany(mappedBy = "checkout", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    @Builder.Default
    private List<CheckoutItem> checkoutItems = new ArrayList<>();
}