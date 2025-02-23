package org.mss.product.repository;


import org.mss.product.model.Product;
import org.mss.product.model.ProductOptionValue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductOptionValueRepository extends JpaRepository<ProductOptionValue, Long> {
    List<ProductOptionValue> findAllByProduct(Product product);

    void deleteByProductIdAndValue(Long productId, String value);
    
    void deleteAllByProductId(Long productId);

}
