package com.gigker.server.domain.member.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
@NoArgsConstructor
public class MemberPatchDto {
    private Long memberId;
    @Length(min = 2, max = 16)
    private String nickName;

    @Length(max = 150)
    private String about;
}
