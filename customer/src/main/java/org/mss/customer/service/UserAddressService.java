package org.mss.customer.service;

import org.mss.commonlibrary.exception.AccessDeniedException;
import org.mss.commonlibrary.exception.NotFoundException;
import org.mss.customer.model.UserAddress;
import org.mss.customer.repository.UserAddressRepository;
import org.mss.customer.utils.Constants;
import org.mss.customer.viewmodel.address.ActiveAddressVm;
import org.mss.customer.viewmodel.address.AddressDetailVm;
import org.mss.customer.viewmodel.address.AddressPostVm;
import org.mss.customer.viewmodel.address.AddressVm;
import org.mss.customer.viewmodel.useraddress.UserAddressVm;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserAddressService {
    private final UserAddressRepository userAddressRepository;
    private final LocationService locationService;

    public UserAddressService(UserAddressRepository userAddressRepository, LocationService locationService) {
        this.userAddressRepository = userAddressRepository;
        this.locationService = locationService;
    }

    public List<ActiveAddressVm> getUserAddressList() {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();
        if (userId.equals("anonymousUser")) {
            throw new AccessDeniedException(Constants.ErrorCode.UNAUTHENTICATED);
        }

        List<UserAddress> userAddressList = userAddressRepository.findAllByUserId(userId);
        List<AddressDetailVm> addressVmList = locationService.getAddressesByIdList(
            userAddressList.stream().map(UserAddress::getAddressId).collect(Collectors.toList()));

        List<ActiveAddressVm> addressActiveVms = userAddressList.stream().flatMap(userAddress -> addressVmList.stream()
                .filter(addressDetailVm -> userAddress.getAddressId().equals(addressDetailVm.id())).map(
                    addressDetailVm -> new ActiveAddressVm(addressDetailVm.id(), addressDetailVm.contactName(),
                        addressDetailVm.phone(), addressDetailVm.addressLine1(), addressDetailVm.city(),
                        addressDetailVm.zipCode(), addressDetailVm.districtId(), addressDetailVm.districtName(),
                        addressDetailVm.stateOrProvinceId(), addressDetailVm.stateOrProvinceName(),
                        addressDetailVm.countryId(), addressDetailVm.countryName(), userAddress.getIsActive())))
            .toList();

        //sort by isActive
        Comparator<ActiveAddressVm> comparator = Comparator.comparing(ActiveAddressVm::isActive).reversed();
        return addressActiveVms.stream().sorted(comparator).collect(Collectors.toList());
    }

    public AddressDetailVm getAddressDefault() {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();
        if (userId.equals("anonymousUser")) {
            throw new AccessDeniedException(Constants.ErrorCode.UNAUTHENTICATED);
        }

        UserAddress userAddress = userAddressRepository.findByUserIdAndIsActiveTrue(userId)
            .orElseThrow(() -> new NotFoundException(Constants.ErrorCode.USER_ADDRESS_NOT_FOUND));

        return locationService.getAddressById(userAddress.getAddressId());
    }

    public UserAddressVm createAddress(AddressPostVm addressPostVm) {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();

        // Fetch all existing addresses for the user
        List<UserAddress> userAddressList = userAddressRepository.findAllByUserId(userId);
        boolean isFirstAddress = userAddressList.isEmpty();

        AddressVm addressGetVm = locationService.createAddress(addressPostVm);
        UserAddress userAddress =
            UserAddress.builder().userId(userId).addressId(addressGetVm.id()).isActive(isFirstAddress).build();

        return UserAddressVm.fromModel(userAddressRepository.save(userAddress), addressGetVm);

    }

    public void deleteAddress(Long id) {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();
        UserAddress userAddress = userAddressRepository.findOneByUserIdAndAddressId(userId, id);
        if (userAddress == null) {
            throw new NotFoundException(Constants.ErrorCode.USER_ADDRESS_NOT_FOUND);
        }
        userAddressRepository.delete(userAddress);
    }

    public void chooseDefaultAddress(Long id) {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();
        List<UserAddress> userAddressList = userAddressRepository.findAllByUserId(userId);
        for (UserAddress userAddress : userAddressList) {
            userAddress.setIsActive(Objects.equals(userAddress.getAddressId(), id));
        }
        userAddressRepository.saveAll(userAddressList);
    }
}
