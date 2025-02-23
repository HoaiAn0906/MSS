package org.mss.media.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "mss")
public record MssConfig(String publicUrl) {
}
