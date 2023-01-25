package com.gigker.server.global.security.mapper;

import com.gigker.server.domain.member.entity.Member;
import com.gigker.server.global.security.dto.LoginDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface LoginMapper {
    LoginDto.Response loginMemberToLoginResponseDto(Member member);
}
