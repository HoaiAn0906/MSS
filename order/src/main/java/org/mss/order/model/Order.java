package org.mss.order.model;


import org.mss.commonlibrary.model.AbstractAuditEntity;
import org.mss.order.model.enumeration.DeliveryMethod;
import org.mss.order.model.enumeration.DeliveryStatus;
import org.mss.order.model.enumeration.OrderStatus;
import org.mss.order.model.enumeration.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;

@Entity
@Table(name = "`order`")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order extends AbstractAuditEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "shipping_address_id", referencedColumnName = "id")
    private OrderAddress shippingAddressId;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "billing_address_id", referencedColumnName = "id")
    private OrderAddress billingAddressId;

    private String note;

    @Column(name = "total_tax")
    private float tax;

    @Column(name = "total_discount_amount")
    private float discount;

    private int numberItem;

    @Column(name = "promotion_code")
    private String couponCode;

    @Column(name = "total_amount")
    private BigDecimal totalPrice;

    @Column(name = "total_shipment_fee")
    private BigDecimal deliveryFee;
    @Enumerated(EnumType.STRING)

    @Column(name = "status")
    private OrderStatus orderStatus;

    @Column(name = "shipment_method_id")
    @Enumerated(EnumType.STRING)
    private DeliveryMethod deliveryMethod;

    @Column(name = "shipment_status")
    @Enumerated(EnumType.STRING)
    private DeliveryStatus deliveryStatus;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    private Long paymentId;

    private String checkoutId;

    private String rejectReason;

    @SuppressWarnings("unused")
    private String paymentMethodId;

    @SuppressWarnings("unused")
    private String progress;

    @SuppressWarnings("unused")
    private String customerId;

    @SuppressWarnings("unused")
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "last_error", columnDefinition = "jsonb")
    private String lastError;

    @SuppressWarnings("unused")
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "attributes", columnDefinition = "jsonb")
    private String attributes;

    @SuppressWarnings("unused")
    private BigDecimal totalShipmentTax;

}