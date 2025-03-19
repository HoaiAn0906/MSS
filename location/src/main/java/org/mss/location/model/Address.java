package org.mss.location.model;

import org.mss.commonlibrary.model.AbstractAuditEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "address")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Builder
public class Address extends AbstractAuditEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 450)
    private String contactName;

    @Column(length = 25)
    private String phone;

    @Column(length = 450, name = "address_line_1")
    private String addressLine1;

    @Column(length = 450, name = "address_line_2")
    private String addressLine2;

    @Column(length = 450)
    private String city;

    @Column(length = 25)
    private String zipCode;

    @ManyToOne
    @JoinColumn(name = "district_id", nullable = false)
    private District district;

    @ManyToOne
    @JoinColumn(name = "state_or_province_id", nullable = false)
    private StateOrProvince stateOrProvince;

    @ManyToOne
    @JoinColumn(name = "country_id", nullable = false)
    private Country country;
}