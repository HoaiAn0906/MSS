package org.mss.product.service;

import lombok.extern.slf4j.Slf4j;
import org.mss.commonlibrary.config.ServiceUrlConfig;
import org.mss.product.viewmodel.NoFileMediaVm;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

@Slf4j
@Service
@RequiredArgsConstructor
public class MediaService extends AbstractCircuitBreakFallbackHandler {
    private final RestClient restClient;
    private final ServiceUrlConfig serviceUrlConfig;

    @Retry(name = "restApi")
    @CircuitBreaker(name = "restCircuitBreaker", fallbackMethod = "handleMediaFallback")
    public NoFileMediaVm saveFile(MultipartFile multipartFile, String caption, String fileNameOverride) {
        final URI url = UriComponentsBuilder.fromHttpUrl(serviceUrlConfig.media()).path("/medias").build().toUri();
        final String jwt = ((Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal())
            .getTokenValue();

        final MultipartBodyBuilder builder = new MultipartBodyBuilder();
        builder.part("multipartFile", multipartFile.getResource());
        builder.part("caption", caption);
        builder.part("fileNameOverride", fileNameOverride);

        return restClient.post()
                .uri(url)
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .headers(h -> h.setBearerAuth(jwt))
                .body(builder.build())
                .retrieve()
                .body(NoFileMediaVm.class);
    }

    @Retry(name = "restApi")
    @CircuitBreaker(name = "restCircuitBreaker", fallbackMethod = "handleMediaFallback")
    public NoFileMediaVm getMedia(Long id) {
        if (id == null) {
            //TODO return default no image url
            return new NoFileMediaVm(null, "", "", "", "");
        }
        log.info("Getting media with id: {}", id);
        log.info("Service URL: {}", serviceUrlConfig.media());
        final URI url = UriComponentsBuilder.fromHttpUrl(serviceUrlConfig.media())
            .path("/medias/{id}").buildAndExpand(id).toUri();
        return restClient.get()
                .uri(url)
                .retrieve()
                .body(NoFileMediaVm.class);
    }

    @Retry(name = "restApi")
    @CircuitBreaker(name = "restCircuitBreaker", fallbackMethod = "handleBodilessFallback")
    public void removeMedia(Long id) {
        final URI url = UriComponentsBuilder.fromHttpUrl(serviceUrlConfig.media()).path("/medias/{id}")
            .buildAndExpand(id).toUri();
        final String jwt = ((Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal())
            .getTokenValue();
        restClient.delete()
                .uri(url)
                .headers(h -> h.setBearerAuth(jwt))
                .retrieve()
                .body(Void.class);
    }

    private NoFileMediaVm handleMediaFallback(Throwable throwable) throws Throwable {
        return handleTypedFallback(throwable);
    }
}
