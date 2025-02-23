package org.mss.storefrontbff.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.Map;

@ConfigurationProperties(prefix = "mss")
public record ServiceUrlConfig(
    Map<String, String> services) {
}
