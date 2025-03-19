package org.mss.payment.model;

import org.mss.commonlibrary.model.AbstractAuditEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.domain.Persistable;

@DynamicUpdate
@Entity
@Table(name = "payment_provider")
@lombok.Setter
@lombok.Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentProvider extends AbstractAuditEntity implements Persistable<String> {
    @Id
    private String id;
    private boolean enabled;
    private String name;
    private String configureUrl;
    private String landingViewComponentName;
    private String additionalSettings;
    private Long mediaId;

    @Version
    private int version;

    @Transient
    private boolean isNew;

    @Override
    public boolean isNew() {
        return isNew;
    }
}