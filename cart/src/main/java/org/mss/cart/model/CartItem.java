package org.mss.cart.model;

import lombok.*;
import org.mss.commonlibrary.model.AbstractAuditEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;

@Entity
@Table(name = "cart_item")
@IdClass(CartItemId.class)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class CartItem extends AbstractAuditEntity {
    @Id
    private String customerId;
    @Id
    private Long productId;
    private int quantity;
}