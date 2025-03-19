package org.mss.customer.viewmodel.customer;

import java.util.List;

public record CustomerListVm(int totalUser, List<CustomerAdminVm> customers, int totalPage) {

}
