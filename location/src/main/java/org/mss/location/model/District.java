package org.mss.location.model;

import org.mss.commonlibrary.model.AbstractAuditEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "district")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Builder
public class District extends AbstractAuditEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 450)
    private String name;

    @Column(length = 450)
    private String type;

    private String location;

    @ManyToOne
    @JoinColumn(name = "state_or_province_id", nullable = false)
    private StateOrProvince stateProvince;
}