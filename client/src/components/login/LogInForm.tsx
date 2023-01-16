import React from "react";
import styled from "styled-components";
import InputBox from "../Input";
import Button from "../Buttons";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { RiKakaoTalkFill } from "react-icons/ri";

const LoginBox = styled.form`
  width: 25rem;
  height: 35rem;
  border: 1px solid ${(props) => props.theme.color.back};
  box-shadow: 2px 2px 10px -5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 2rem;
`;

const InputSection = styled.div`
  margin: 1rem 0;
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SocialLogin = styled.div`
  width: 300px;
  margin-top: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const LogInForm = () => {
  return (
    <LoginBox>
      <InputSection>
        <label htmlFor={"email"}>이메일</label>
        <InputBox
          id={"email"}
          type={"email"}
          name={"email"}
          width={"300px"}
          placeholder={"이메일을 입력해주세요"}
        />
      </InputSection>
      <InputSection>
        <label htmlFor={"password"}>비밀번호</label>
        <InputBox
          id={"password"}
          type={"password"}
          name={"password"}
          width={"300px"}
          placeholder={"비밀번호를 입력해주세요"}
        />
      </InputSection>
      <InputSection>
        <Button color={"#6F38C5"} width={"300px"} type={"submit"}>
          로그인
        </Button>
      </InputSection>
      <SocialLogin>
        <a href={"/"}>
          <FcGoogle size={50} />
        </a>
        <a href={"/"}>
          <BsFacebook size={50} color={"#4267B2"} />
        </a>
        <a href={"/"}>
          <RiKakaoTalkFill size={50} color={"#F7E600"} />
        </a>
      </SocialLogin>
      <InputSection>
        <a href={"/"}>회원가입</a>
      </InputSection>
    </LoginBox>
  );
};

export default LogInForm;
