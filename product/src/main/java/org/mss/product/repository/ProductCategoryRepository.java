package org.mss.product.repository;

import org.mss.product.model.Category;
import org.mss.product.model.ProductCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
    Page<ProductCategory> findAllByCategory(Pageable pageable, Category category);

    List<ProductCategory> findAllByProductId(Long productId);
}
