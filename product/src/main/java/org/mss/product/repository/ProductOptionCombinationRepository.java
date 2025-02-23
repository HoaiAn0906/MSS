package org.mss.product.repository;

import org.mss.product.model.Product;
import org.mss.product.model.ProductOptionCombination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductOptionCombinationRepository extends JpaRepository<ProductOptionCombination, Long> {

    @Query("select e from ProductOptionCombination e"
        + " where e.product.parent.id = ?1")
    List<ProductOptionCombination> findAllByParentProductId(Long parentProductId);

    List<ProductOptionCombination> findAllByProduct(Product product);

    Optional<ProductOptionCombination> findByProductId(Long productId);

    void deleteByProductId(Long productId);
}
