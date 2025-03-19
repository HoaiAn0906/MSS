package org.mss.payment.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "mss.services")
public record ServiceUrlConfig(
        String order,
        String media
) {}
