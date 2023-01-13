import React from "react";
import styled from "styled-components";
import InputBox from "../Input";
import Button from "../Buttons";
import { FcGoogle } from "react-icons/fc";

const LoginBox = styled.form`
  width: 25rem;
  height: 35rem;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 2rem;
`;

const Section = styled.div`
  margin: 1rem 0;
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogInForm = () => {
  return (
    <LoginBox>
      <Section>
        <label htmlFor={"email"}>이메일</label>
        <InputBox
          id={"email"}
          type={"email"}
          name={"email"}
          width={"300px"}
          placeholder={"이메일을 입력해주세요"}
        />
      </Section>
      <Section>
        <label htmlFor={"password"}>비밀번호</label>
        <InputBox
          id={"password"}
          type={"password"}
          name={"password"}
          width={"300px"}
          placeholder={"비밀번호를 입력해주세요"}
        />
      </Section>
      <Section>
        <Button color={"#6F38C5"} width={"300px"}>
          로그인
        </Button>
      </Section>
      <Section>
        <FcGoogle />
      </Section>
    </LoginBox>
  );
};

export default LogInForm;
