package org.mss.media;

import org.mss.commonlibrary.config.CorsConfig;
import org.mss.media.config.MssConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication(scanBasePackages = {"org.mss.media", "org.mss.commonlibrary"})
@EnableConfigurationProperties({MssConfig.class, CorsConfig.class})
public class MediaApplication {

    public static void main(String[] args) {
        SpringApplication.run(MediaApplication.class, args);
    }

}
