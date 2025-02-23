package org.mss.media.service;

import org.mss.media.model.Media;
import org.mss.media.model.dto.MediaDto;
import org.mss.media.viewmodel.MediaPostVm;
import org.mss.media.viewmodel.MediaVm;
import java.util.List;

public interface MediaService {
    Media saveMedia(MediaPostVm mediaPostVm);

    MediaVm getMediaById(Long id);

    void removeMedia(Long id);

    MediaDto getFile(Long id, String fileName);

    List<MediaVm> getMediaByIds(List<Long> ids);
}
