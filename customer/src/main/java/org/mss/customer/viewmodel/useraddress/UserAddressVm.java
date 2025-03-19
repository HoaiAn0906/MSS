package org.mss.customer.viewmodel.useraddress;

import org.mss.customer.model.UserAddress;
import org.mss.customer.viewmodel.address.AddressVm;
import lombok.Builder;

@Builder
public record UserAddressVm(
    Long id,
    String userId,
    AddressVm addressGetVm,
    Boolean isActive) {
    public static UserAddressVm fromModel(UserAddress userAddress, AddressVm addressGetVm) {
        return UserAddressVm.builder()
            .id(userAddress.getId())
            .userId(userAddress.getUserId())
            .addressGetVm(addressGetVm)
            .isActive(userAddress.getIsActive())
            .build();
    }
}
