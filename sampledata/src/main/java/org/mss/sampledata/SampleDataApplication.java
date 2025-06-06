package org.mss.sampledata;

import org.mss.commonlibrary.config.CorsConfig;
import org.mss.commonlibrary.config.ServiceUrlConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class},
    scanBasePackages = {"org.mss.sampledata", "org.mss.commonlibrary"})
@EnableConfigurationProperties({ServiceUrlConfig.class, CorsConfig.class})
public class SampleDataApplication {

    public static void main(String[] args) {
        SpringApplication.run(SampleDataApplication.class, args);
    }
}
