package org.mss.product.service;

import org.mss.commonlibrary.exception.BadRequestException;
import org.mss.commonlibrary.exception.DuplicatedException;
import org.mss.commonlibrary.exception.NotFoundException;
import org.mss.product.model.attribute.ProductAttribute;
import org.mss.product.model.attribute.ProductAttributeGroup;
import org.mss.product.repository.ProductAttributeGroupRepository;
import org.mss.product.repository.ProductAttributeRepository;
import org.mss.product.utils.Constants;
import org.mss.product.viewmodel.productattribute.ProductAttributeGetVm;
import org.mss.product.viewmodel.productattribute.ProductAttributeListGetVm;
import org.mss.product.viewmodel.productattribute.ProductAttributePostVm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ProductAttributeService {
    private final ProductAttributeRepository productAttributeRepository;
    private final ProductAttributeGroupRepository productAttributeGroupRepository;

    public ProductAttributeService(ProductAttributeRepository productAttributeRepository,
                                   ProductAttributeGroupRepository productAttributeGroupRepository) {
        this.productAttributeRepository = productAttributeRepository;
        this.productAttributeGroupRepository = productAttributeGroupRepository;
    }

    public ProductAttributeListGetVm getPageableProductAttributes(int pageNo, int pageSize) {
        List<ProductAttributeGetVm> productAttributeGetVms = new ArrayList<>();
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<ProductAttribute> productAttributePage = productAttributeRepository.findAll(pageable);
        List<ProductAttribute> productAttributes = productAttributePage.getContent();
        for (ProductAttribute productAttribute : productAttributes) {
            productAttributeGetVms.add(ProductAttributeGetVm.fromModel(productAttribute));
        }

        return new ProductAttributeListGetVm(
                productAttributeGetVms,
                productAttributePage.getNumber(),
                productAttributePage.getSize(),
                (int) productAttributePage.getTotalElements(),
                productAttributePage.getTotalPages(),
                productAttributePage.isLast()
        );
    }

    public ProductAttribute save(ProductAttributePostVm productAttributePostVm) {
        validateExistedName(productAttributePostVm.name(), null);
        ProductAttribute productAttribute = new ProductAttribute();
        productAttribute.setName(productAttributePostVm.name());

        if (productAttributePostVm.productAttributeGroupId() != null) {
            ProductAttributeGroup productAttributeGroup = productAttributeGroupRepository
                    .findById(productAttributePostVm.productAttributeGroupId())
                    .orElseThrow(() -> new BadRequestException(
                        String.format(Constants.ErrorCode.PRODUCT_ATTRIBUTE_GROUP_NOT_FOUND,
                            productAttributePostVm.productAttributeGroupId())));
            productAttribute.setProductAttributeGroup(productAttributeGroup);
        }

        return productAttributeRepository.save(productAttribute);
    }

    public ProductAttribute update(ProductAttributePostVm productAttributePostVm, Long id) {
        validateExistedName(productAttributePostVm.name(), id);
        ProductAttribute productAttribute = productAttributeRepository
                .findById(id)
                .orElseThrow(
                    () -> new NotFoundException(String.format(Constants.ErrorCode.PRODUCT_ATTRIBUTE_NOT_FOUND, id)));
        productAttribute.setName(productAttributePostVm.name());


        if (productAttributePostVm.productAttributeGroupId() != null) {
            ProductAttributeGroup productAttributeGroup = productAttributeGroupRepository
                    .findById(productAttributePostVm.productAttributeGroupId())
                    .orElseThrow(()
                        -> new BadRequestException(String.format(Constants.ErrorCode.PRODUCT_ATTRIBUTE_GROUP_NOT_FOUND,
                            productAttributePostVm.productAttributeGroupId())));
            productAttribute.setProductAttributeGroup(productAttributeGroup);
        }

        return productAttributeRepository.save(productAttribute);
    }

    private void validateExistedName(String name, Long id) {
        if (checkExistedName(name, id)) {
            throw new DuplicatedException(Constants.ErrorCode.NAME_ALREADY_EXITED, name);
        }
    }

    private boolean checkExistedName(String name, Long id) {
        return productAttributeRepository.findExistedName(name, id) != null;
    }
}
