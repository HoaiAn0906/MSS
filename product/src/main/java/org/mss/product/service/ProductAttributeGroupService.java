package org.mss.product.service;

import org.mss.commonlibrary.exception.DuplicatedException;
import org.mss.product.model.attribute.ProductAttributeGroup;
import org.mss.product.repository.ProductAttributeGroupRepository;
import org.mss.product.utils.Constants;
import org.mss.product.viewmodel.productattribute.ProductAttributeGroupListGetVm;
import org.mss.product.viewmodel.productattribute.ProductAttributeGroupVm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ProductAttributeGroupService {
    private final ProductAttributeGroupRepository productAttributeGroupRepository;

    public ProductAttributeGroupService(ProductAttributeGroupRepository productAttributeGroupRepository) {
        this.productAttributeGroupRepository = productAttributeGroupRepository;
    }

    public ProductAttributeGroupListGetVm getPageableProductAttributeGroups(int pageNo, int pageSize) {
        List<ProductAttributeGroupVm> productAttributeGroupVms = new ArrayList<>();
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<ProductAttributeGroup> productAttributeGroupPage = productAttributeGroupRepository.findAll(pageable);
        List<ProductAttributeGroup> productAttributeGroups = productAttributeGroupPage.getContent();
        for (ProductAttributeGroup productAttributeGroup : productAttributeGroups) {
            productAttributeGroupVms.add(ProductAttributeGroupVm.fromModel(productAttributeGroup));
        }

        return new ProductAttributeGroupListGetVm(
                productAttributeGroupVms,
                productAttributeGroupPage.getNumber(),
                productAttributeGroupPage.getSize(),
                (int) productAttributeGroupPage.getTotalElements(),
                productAttributeGroupPage.getTotalPages(),
                productAttributeGroupPage.isLast()
        );
    }

    public void save(ProductAttributeGroup productAttributeGroup) {
        if (checkExistedName(productAttributeGroup.getName(), productAttributeGroup.getId())) {
            throw new DuplicatedException(Constants.ErrorCode.NAME_ALREADY_EXITED, productAttributeGroup.getName());
        }
        productAttributeGroupRepository.save(productAttributeGroup);
    }

    private boolean checkExistedName(String name, Long id) {
        return productAttributeGroupRepository.findExistedName(name, id) != null;
    }
}
