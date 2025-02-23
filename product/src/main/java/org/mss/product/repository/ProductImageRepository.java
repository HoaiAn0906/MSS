package org.mss.product.repository;

import org.mss.product.model.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {

    @Modifying
    @Query("DELETE FROM ProductImage p WHERE p.product.id = :productId AND p.imageId IN :imageIds")
    void deleteByImageIdInAndProductId(List<Long> imageIds, Long productId);

    @Modifying
    @Query("DELETE FROM ProductImage p WHERE p.product.id = :productId")
    void deleteByProductId(Long productId);
}
