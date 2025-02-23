package org.mss.product.repository;

import org.mss.product.model.Product;
import org.mss.product.model.attribute.ProductAttributeValue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductAttributeValueRepository extends JpaRepository<ProductAttributeValue, Long> {
    List<ProductAttributeValue> findAllByProduct(Product product);
}
