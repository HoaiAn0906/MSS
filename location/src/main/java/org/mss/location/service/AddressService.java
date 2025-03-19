package org.mss.location.service;

import org.mss.commonlibrary.exception.NotFoundException;
import org.mss.location.model.Address;
import org.mss.location.model.Country;
import org.mss.location.repository.AddressRepository;
import org.mss.location.repository.CountryRepository;
import org.mss.location.repository.DistrictRepository;
import org.mss.location.repository.StateOrProvinceRepository;
import org.mss.location.utils.Constants;
import org.mss.location.viewmodel.address.AddressDetailVm;
import org.mss.location.viewmodel.address.AddressGetVm;
import org.mss.location.viewmodel.address.AddressPostVm;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;
    private final StateOrProvinceRepository stateOrProvinceRepository;
    private final CountryRepository countryRepository;
    private final DistrictRepository districtRepository;

    public AddressGetVm createAddress(AddressPostVm dto) {
        Address address = AddressPostVm.fromModel(dto);
        stateOrProvinceRepository.findById(dto.stateOrProvinceId()).ifPresent(address::setStateOrProvince);
        Country country = countryRepository.findById(dto.countryId())
            .orElseThrow(() -> new NotFoundException(Constants.ErrorCode.COUNTRY_NOT_FOUND, dto.countryId()));
        address.setCountry(country);
        districtRepository.findById(dto.districtId()).ifPresent(address::setDistrict);
        return AddressGetVm.fromModel(addressRepository.save(address));
    }

    public void updateAddress(Long id, AddressPostVm dto) {
        Address address = addressRepository.findById(id).orElseThrow(() ->
            new NotFoundException(Constants.ErrorCode.ADDRESS_NOT_FOUND, id));

        address.setContactName(dto.contactName());
        address.setAddressLine1(dto.addressLine1());
        address.setAddressLine2(dto.addressLine2());
        address.setPhone(dto.phone());
        address.setCity(dto.city());
        address.setZipCode(dto.zipCode());

        stateOrProvinceRepository.findById(dto.stateOrProvinceId()).ifPresent(address::setStateOrProvince);
        countryRepository.findById(dto.countryId()).ifPresent(address::setCountry);
        districtRepository.findById(dto.districtId()).ifPresent(address::setDistrict);
        addressRepository.save(address);
    }

    public List<AddressDetailVm> getAddressList(List<Long> ids) {
        List<Address> addressList = addressRepository.findAllByIdIn(ids);
        return addressList.stream().map(address -> AddressDetailVm.fromModel(address)).toList();
    }

    public AddressDetailVm getAddress(Long id) {
        Address address = addressRepository.findById(id).orElseThrow(() ->
            new NotFoundException(Constants.ErrorCode.ADDRESS_NOT_FOUND, id));
        return AddressDetailVm.fromModel(address);
    }

    public void deleteAddress(Long id) {
        Address address = addressRepository.findById(id).orElseThrow(() ->
            new NotFoundException(Constants.ErrorCode.ADDRESS_NOT_FOUND, id));
        addressRepository.delete(address);
    }
}
