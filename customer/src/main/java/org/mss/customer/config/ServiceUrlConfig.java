package org.mss.customer.config;


import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "mss.services")
public record ServiceUrlConfig(
        String location) {
}
