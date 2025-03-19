package org.mss.customer.viewmodel.address;

public record AddressPostVm(String contactName, String phone, String addressLine1, String city, String zipCode,
                            Long districtId, Long stateOrProvinceId, Long countryId) {
}
