import React from "react";
import styled from "styled-components";
import InputBox from "../Input";
import Button from "../Buttons";

const SignUpBox = styled.form`
  margin-top: 15rem;
  width: 30rem;
  height: auto;
  border: 1px solid ${(props) => props.theme.color.back};
  box-shadow: 2px 2px 10px -5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 2rem;
`;

const InputSection = styled.div`
  margin: 1rem 0 0 0;
  height: 5rem;
  display: flex;
  flex-direction: column;
  label {
    margin-left: 1rem;
  }
`;

const IntroduceSection = styled.div`
  margin: 1rem 0 1rem 0;
  display: flex;
  flex-direction: column;
  label {
    margin-left: 1rem;
  }
`;

const UploadSection = styled.div`
  margin: 1rem 0 2rem 0;
  height: 5rem;
  display: flex;
  flex-direction: column;
  input {
    padding: 10px;
  }
  label {
    margin-left: 1rem;
  }
  input::file-selector-button {
    display: none;
  }
`;

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  width?: number | string | undefined;
}

const StyledTextArea = styled.textarea<TextareaProps>`
  min-height: 10rem;
  width: ${(props) => props.width};
  margin: 0.5rem 1rem 0 1rem;
  padding: 10px;
  border: solid 1px ${(props) => props.theme.color.sub2};
  border-radius: 8px;
  outline: none;
  :hover {
    border: solid 1px ${(props) => props.theme.color.main};
    -webkit-transition: 0.25s;
    transition: 0.25s;
    outline: none;
  }
  :focus {
    border: solid 1px ${(props) => props.theme.color.main};
    -webkit-transition: 0.25s;
    transition: 0.25s;
    outline: none;
  }
`;

const SignUpForm = () => {
  return (
    <SignUpBox>
      <InputSection>
        <label htmlFor={"email"}>이메일</label>
        <InputBox
          id={"email"}
          type={"email"}
          name={"email"}
          width={"350px"}
          placeholder={"이메일을 입력해주세요"}
        />
      </InputSection>
      <InputSection>
        <label htmlFor={"email"}>닉네임</label>
        <InputBox
          id={"nickname"}
          type={"text"}
          name={"nickname"}
          width={"350px"}
          placeholder={"닉네임을 입력해주세요"}
        />
      </InputSection>
      <InputSection>
        <label htmlFor={"email"}>비밀번호</label>
        <InputBox
          id={"password"}
          type={"password"}
          name={"password"}
          width={"350px"}
          placeholder={"비밀번호를 입력해주세요"}
        />
      </InputSection>
      <IntroduceSection>
        <label htmlFor={"introdution"}>자기소개</label>
        <StyledTextArea
          id={"introduction"}
          name={"introduction"}
          width={"350px"}
          placeholder={"자기소개"}
        />
      </IntroduceSection>
      <UploadSection>
        <label htmlFor={"file"}>프로필 사진</label>
        <InputBox
          id={"file"}
          type={"file"}
          name={"file"}
          width={"350px"}
          placeholder={"이미지 파일"}
        />
      </UploadSection>
      <InputSection>
        <Button color={"#6F38C5"} width={"350px"} type={"submit"}>
          회원가입
        </Button>
      </InputSection>
    </SignUpBox>
  );
};

export default SignUpForm;
