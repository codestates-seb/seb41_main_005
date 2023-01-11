package com.gigker.server.domain.member.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor
public class MemberPostDto {
    //이메일
    @NotBlank
    @Email
    private String email;

    //비밀번호
    @NotBlank(message = "암호는 공백 없이 8-20자여야 합니다.")
    @Length(min = 8, max = 20)
    private String password;

    //닉네임
    @NotBlank(message = "닉네임은 공백 없이 5-16자여야 합니다.")
    @Length(min = 2, max = 16)
    private String nickName;

    //사진Url
    @NotBlank
    private String pictureUrl;

    //자기소개
    @NotBlank
    @Length(max = 150)
    private String about;
}
