package org.mss.tax.model;

import org.mss.commonlibrary.model.AbstractAuditEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tax_class")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Builder
public class TaxClass extends AbstractAuditEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 450)
    private String name;
}