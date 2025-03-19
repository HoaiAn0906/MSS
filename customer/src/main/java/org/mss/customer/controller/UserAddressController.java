package org.mss.customer.controller;

import org.mss.customer.service.UserAddressService;
import org.mss.customer.viewmodel.address.ActiveAddressVm;
import org.mss.customer.viewmodel.address.AddressDetailVm;
import org.mss.customer.viewmodel.address.AddressPostVm;
import org.mss.customer.viewmodel.useraddress.UserAddressVm;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserAddressController {

    private final UserAddressService userAddressService;

    @GetMapping("/storefront/user-address")
    public ResponseEntity<List<ActiveAddressVm>> getUserAddresses() {
        return ResponseEntity.ok(userAddressService.getUserAddressList());
    }

    @GetMapping("/storefront/user-address/default-address")
    public ResponseEntity<AddressDetailVm> getDefaultAddress() {
        return ResponseEntity.ok(userAddressService.getAddressDefault());
    }

    @PostMapping("/storefront/user-address")
    public ResponseEntity<UserAddressVm> createAddress(@Valid @RequestBody AddressPostVm addressPostVm) {
        return ResponseEntity.ok(userAddressService.createAddress(addressPostVm));
    }

    @DeleteMapping("/storefront/user-address/{id}")
    public ResponseEntity deleteAddress(@PathVariable Long id) {
        userAddressService.deleteAddress(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/storefront/user-address/{id}")
    public ResponseEntity chooseDefaultAddress(@PathVariable Long id) {
        userAddressService.chooseDefaultAddress(id);
        return ResponseEntity.ok().build();
    }
}
