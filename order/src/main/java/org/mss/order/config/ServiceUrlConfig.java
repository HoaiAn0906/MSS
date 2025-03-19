package org.mss.order.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "mss.services")
public record ServiceUrlConfig(
        String cart, String customer, String product, String tax, String promotion) {
}
