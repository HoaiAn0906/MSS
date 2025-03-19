package org.mss.location.service;

import org.mss.commonlibrary.exception.DuplicatedException;
import org.mss.commonlibrary.exception.NotFoundException;
import org.mss.location.mapper.CountryMapper;
import org.mss.location.model.Country;
import org.mss.location.repository.CountryRepository;
import org.mss.location.utils.Constants;
import org.mss.location.viewmodel.country.CountryListGetVm;
import org.mss.location.viewmodel.country.CountryPostVm;
import org.mss.location.viewmodel.country.CountryVm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CountryService {

    private final CountryRepository countryRepository;

    private final CountryMapper countryMapper;

    public CountryService(CountryRepository countryRepository, CountryMapper countryMapper) {
        this.countryRepository = countryRepository;
        this.countryMapper = countryMapper;
    }

    @Transactional(readOnly = true)
    public List<CountryVm> findAllCountries() {
        return countryRepository
            .findAll(Sort.by(Sort.Direction.ASC, "name"))
            .stream()
            .map(countryMapper::toCountryViewModelFromCountry)
            .toList();
    }

    @Transactional(readOnly = true)
    public CountryVm findById(final Long id) {
        final Country country = countryRepository
            .findById(id)
            .orElseThrow(
                () -> new NotFoundException(Constants.ErrorCode.COUNTRY_NOT_FOUND, id));
        return countryMapper.toCountryViewModelFromCountry(country);
    }

    @Transactional
    public Country create(final CountryPostVm countryPostVm) {
        if (countryRepository.existsByCode2IgnoreCase(countryPostVm.code2())) {
            throw new DuplicatedException(Constants.ErrorCode.CODE_ALREADY_EXISTED, countryPostVm.code2());
        }
        if (countryRepository.existsByNameIgnoreCase(countryPostVm.name())) {
            throw new DuplicatedException(Constants.ErrorCode.NAME_ALREADY_EXITED, countryPostVm.name());
        }
        return countryRepository.save(countryMapper.toCountryFromCountryPostViewModel(countryPostVm));
    }

    @Transactional
    public void update(final CountryPostVm countryPostVm, final Long id) {
        final Country country = countryRepository
            .findById(id)
            .orElseThrow(() -> new NotFoundException(Constants.ErrorCode.COUNTRY_NOT_FOUND, id));

        //For the updating case we don't need to check for the country being updated
        if (countryRepository.existsByNameIgnoreCaseAndIdNot(countryPostVm.name(), id)) {
            throw new DuplicatedException(Constants.ErrorCode.NAME_ALREADY_EXITED, countryPostVm.name());
        }
        if (countryRepository.existsByCode2IgnoreCaseAndIdNot(countryPostVm.code2(), id)) {
            throw new DuplicatedException(Constants.ErrorCode.CODE_ALREADY_EXISTED, countryPostVm.code2());
        }
        countryMapper.toCountryFromCountryPostViewModel(country, countryPostVm);
        countryRepository.save(country);
    }

    @Transactional
    public void delete(final Long id) {
        final boolean isCountryExisted = countryRepository.existsById(id);
        if (!isCountryExisted) {
            throw new NotFoundException(Constants.ErrorCode.COUNTRY_NOT_FOUND, id);
        }
        countryRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public CountryListGetVm getPageableCountries(final int pageNo, final int pageSize) {
        final Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(Sort.Direction.ASC, "name"));
        final Page<Country> countryPage = countryRepository.findAll(pageable);
        final List<Country> countryList = countryPage.getContent();

        final List<CountryVm> countryVms = countryList.stream()
            .map(CountryVm::fromModel)
            .toList();

        return new CountryListGetVm(
            countryVms,
            countryPage.getNumber(),
            countryPage.getSize(),
            (int) countryPage.getTotalElements(),
            countryPage.getTotalPages(),
            countryPage.isLast()
        );
    }
}
