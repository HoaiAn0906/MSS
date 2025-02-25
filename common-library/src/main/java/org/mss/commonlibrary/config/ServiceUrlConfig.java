package org.mss.commonlibrary.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "mss.services")
public record ServiceUrlConfig(String media, String product) {
}