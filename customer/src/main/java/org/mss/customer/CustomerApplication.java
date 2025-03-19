package org.mss.customer;

import org.mss.commonlibrary.config.CorsConfig;
import org.springframework.boot.SpringApplication;
import org.mss.customer.config.ServiceUrlConfig;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication(scanBasePackages = {"org.mss.customer", "org.mss.commonlibrary"})
@EnableConfigurationProperties({ServiceUrlConfig.class, CorsConfig.class})
public class CustomerApplication {

	public static void main(String[] args) {
		SpringApplication.run(CustomerApplication.class, args);
	}

}
