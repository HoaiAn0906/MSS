package org.mss.product.model.attribute;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.mss.commonlibrary.model.AbstractAuditEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "product_attribute")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductAttribute extends AbstractAuditEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "product_attribute_group_id")
    private ProductAttributeGroup productAttributeGroup;

    @OneToMany(mappedBy = "productAttribute")
    @JsonIgnore
    private List<ProductAttributeTemplate> productAttributeTemplates = new ArrayList<>();

    @OneToMany(mappedBy = "productAttribute")
    private List<ProductAttributeValue> attributeValues = new ArrayList<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProductAttribute)) {
            return false;
        }
        return id != null && id.equals(((ProductAttribute) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }
}