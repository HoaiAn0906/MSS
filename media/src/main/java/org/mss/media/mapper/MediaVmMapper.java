package org.mss.media.mapper;

import org.mss.commonlibrary.mapper.BaseMapper;
import org.mss.media.model.Media;
import org.mss.media.viewmodel.MediaVm;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MediaVmMapper extends BaseMapper<Media, MediaVm> {
}
