package org.mss.storefrontbff.viewmodel;

public record AuthenticationInfoVm(boolean isAuthenticated, AuthenticatedUserVm authenticatedUser) {
}
