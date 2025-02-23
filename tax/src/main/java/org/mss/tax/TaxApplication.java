package org.mss.tax;

import org.mss.commonlibrary.config.CorsConfig;
import org.mss.tax.config.ServiceUrlConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication(scanBasePackages = {"org.mss.tax", "org.mss.commonlibrary"})
@EnableConfigurationProperties({ServiceUrlConfig.class, CorsConfig.class})
public class TaxApplication {

    public static void main(String[] args) {
        SpringApplication.run(TaxApplication.class, args);
    }

}
