package org.mss.media.service;

import org.mss.commonlibrary.exception.NotFoundException;
import org.mss.media.config.MssConfig;
import org.mss.media.mapper.MediaVmMapper;
import org.mss.media.model.Media;
import org.mss.media.model.dto.MediaDto;
import org.mss.media.model.dto.MediaDto.MediaDtoBuilder;
import org.mss.media.repository.FileSystemRepository;
import org.mss.media.repository.MediaRepository;
import org.mss.media.utils.StringUtils;
import org.mss.media.viewmodel.MediaPostVm;
import org.mss.media.viewmodel.MediaVm;
import org.mss.media.viewmodel.NoFileMediaVm;
import java.io.InputStream;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@RequiredArgsConstructor
@Service
public class MediaServiceImpl implements MediaService {

    private final MediaVmMapper mediaVmMapper;
    private final MediaRepository mediaRepository;
    private final FileSystemRepository fileSystemRepository;
    private final MssConfig mssConfig;

    @Override
    @SneakyThrows
    public Media saveMedia(MediaPostVm mediaPostVm) {
        Media media = new Media();
        media.setCaption(mediaPostVm.caption());
        media.setMediaType(mediaPostVm.multipartFile().getContentType());

        if (StringUtils.hasText(mediaPostVm.fileNameOverride())) {
            media.setFileName(mediaPostVm.fileNameOverride().trim());
        } else {
            media.setFileName(mediaPostVm.multipartFile().getOriginalFilename());
        }
        String filePath = fileSystemRepository.persistFile(media.getFileName(),
            mediaPostVm.multipartFile().getBytes());
        media.setFilePath(filePath);

        return mediaRepository.save(media);
    }

    @Override
    public void removeMedia(Long id) {
        NoFileMediaVm noFileMediaVm = mediaRepository.findByIdWithoutFileInReturn(id);
        if (noFileMediaVm == null) {
            throw new NotFoundException(String.format("Media %s is not found", id));
        }
        mediaRepository.deleteById(id);
    }

    @Override
    public MediaVm getMediaById(Long id) {
        NoFileMediaVm noFileMediaVm = mediaRepository.findByIdWithoutFileInReturn(id);
        if (noFileMediaVm == null) {
            return null;
        }
        String url = getMediaUrl(noFileMediaVm.id(), noFileMediaVm.fileName());

        return new MediaVm(
            noFileMediaVm.id(),
            noFileMediaVm.caption(),
            noFileMediaVm.fileName(),
            noFileMediaVm.mediaType(),
            url
        );
    }

    @Override
    public MediaDto getFile(Long id, String fileName) {

        MediaDtoBuilder builder = MediaDto.builder();

        Media media = mediaRepository.findById(id).orElse(null);
        if (media == null || !fileName.equalsIgnoreCase(media.getFileName())) {
            return builder.build();
        }
        MediaType mediaType = MediaType.valueOf(media.getMediaType());
        InputStream fileContent = fileSystemRepository.getFile(media.getFilePath());

        return builder
            .content(fileContent)
            .mediaType(mediaType)
            .build();
    }

    @Override
    public List<MediaVm> getMediaByIds(List<Long> ids) {
        return mediaRepository.findAllById(ids).stream()
                .map(mediaVmMapper::toVm)
                .map(media -> {
                    String url = getMediaUrl(media.getId(), media.getFileName());
                    media.setUrl(url);
                    return media;
                }).toList();
    }

    private String getMediaUrl(Long mediaId, String fileName) {
        return UriComponentsBuilder.fromUriString(mssConfig.publicUrl())
                .path(String.format("/medias/%1$s/file/%2$s", mediaId, fileName))
                .build().toUriString();
    }
}