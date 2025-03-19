package org.mss.order.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import org.mss.commonlibrary.model.AbstractAuditEntity;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "checkout_item")
@Getter
@Setter
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class CheckoutItem extends AbstractAuditEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long productId;

    @Column(name = "name")
    private String productName;

    @SuppressWarnings("unused")
    private String description;

    private int quantity;

    @Column(name = "price")
    private BigDecimal productPrice;

    @Column(name = "tax")
    private BigDecimal taxAmount;

    @SuppressWarnings("unused")
    private BigDecimal shipmentFee;

    @SuppressWarnings("unused")
    private BigDecimal shipmentTax;

    private BigDecimal discountAmount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "checkout_id", updatable = false, nullable = false)
    @JsonBackReference
    private Checkout checkout;

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CheckoutItem)) {
            return false;
        }
        return id != null && id.equals(((CheckoutItem) o).getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}