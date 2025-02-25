package org.mss.product.service;

import java.util.ArrayList;
import java.util.List;
import org.mss.commonlibrary.exception.BadRequestException;
import org.mss.commonlibrary.exception.DuplicatedException;
import org.mss.commonlibrary.exception.NotFoundException;
import org.mss.product.model.Brand;
import org.mss.product.repository.BrandRepository;
import org.mss.product.utils.Constants;
import org.mss.product.viewmodel.brand.BrandListGetVm;
import org.mss.product.viewmodel.brand.BrandPostVm;
import org.mss.product.viewmodel.brand.BrandVm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class BrandService {
    
    private final BrandRepository brandRepository;
    
    public BrandService(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }

    public BrandListGetVm getBrands(int pageNo, int pageSize) {
        List<BrandVm> brandVms = new ArrayList<>();
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Brand> brandPage = brandRepository.findAll(pageable);
        List<Brand> brandList = brandPage.getContent();
        for (Brand brand : brandList) {
            brandVms.add(BrandVm.fromModel(brand));
        }

        return new BrandListGetVm(
            brandVms,
            brandPage.getNumber(),
            brandPage.getSize(),
            (int) brandPage.getTotalElements(),
            brandPage.getTotalPages(),
            brandPage.isLast()
        );
    }
    
    public Brand create(BrandPostVm brandPostVm) {
        validateExistedName(brandPostVm.name(), null);

        return brandRepository.save(brandPostVm.toModel());
    }

    public Brand update(BrandPostVm brandPostVm, Long id) {
        validateExistedName(brandPostVm.name(), id);

        Brand brand = brandRepository
                .findById(id)
                .orElseThrow(() -> new NotFoundException(Constants.ErrorCode.BRAND_NOT_FOUND, id));
        brand.setSlug(brandPostVm.slug());
        brand.setName(brandPostVm.name());
        brand.setPublished(brandPostVm.isPublish());

        return brandRepository.save(brand);
    }

    public void delete(long id) {
        Brand brand = brandRepository.findById(id).orElseThrow(
                () -> new NotFoundException(Constants.ErrorCode.BRAND_NOT_FOUND, id));
        if (!brand.getProducts().isEmpty()) {
            throw new BadRequestException(Constants.ErrorCode.MAKE_SURE_BRAND_DONT_CONTAINS_ANY_PRODUCT);
        }
        brandRepository.deleteById(id);
    }

    private void validateExistedName(String name, Long id) {
        if (checkExistedName(name, id)) {
            throw new DuplicatedException(Constants.ErrorCode.NAME_ALREADY_EXITED, name);
        }
    }

    private boolean checkExistedName(String name, Long id) {
        return brandRepository.findExistedName(name, id) != null;
    }
}
