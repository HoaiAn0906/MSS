package org.mss.storefrontbff.viewmodel;

import java.util.List;

public record CartGetDetailVm(Long id, String customerId, List<CartDetailVm> cartDetails) {

}
