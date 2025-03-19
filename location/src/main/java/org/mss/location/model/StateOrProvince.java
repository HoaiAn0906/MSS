package org.mss.location.model;

import org.mss.commonlibrary.model.AbstractAuditEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "state_or_province")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Builder
public class StateOrProvince extends AbstractAuditEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 255)
    private String code;

    @Column(nullable = false, length = 450)
    private String name;

    @Column(length = 255)
    private String type;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "country_id", nullable = false)
    private Country country;
}