package org.mss.payment.model;

import org.mss.commonlibrary.model.AbstractAuditEntity;
import org.mss.payment.model.enumeration.PaymentMethod;
import org.mss.payment.model.enumeration.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "payment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment extends AbstractAuditEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long orderId;

    private String checkoutId;

    private BigDecimal amount;

    private BigDecimal paymentFee;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    private String gatewayTransactionId;

    private String failureMessage;

    @SuppressWarnings("unused")
    private String paymentProviderCheckoutId;

}