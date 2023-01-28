import React from "react";
import styled from "styled-components";
import InputBox from "../Input";
import Button from "../Buttons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../util/redux";
import {
  setEmail,
  setNickname,
  setPassword,
  setPasswordConfirm,
  setIntroduction,
  setImage,
} from "../../util/redux/SignUp";
import {
  setEmailMessage,
  setIsEmail,
  setNickNameMessage,
  setIsNickName,
  setPasswordMessage,
  setIsPassword,
  setPasswordConfirmMessage,
  setIsPasswordConfirm,
  setIntroductionMessage,
  setIsIntroduction,
  setIsUpload,
} from "../../util/redux/Validation";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

const SignUpBox = styled.form<FormProps>`
  margin: 100px 0;
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
  height: 12rem;
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

const StyledSpan = styled.span`
  font-size: 12px;
  margin: 4px 0 0 2rem;
  &.success {
    color: black;
  }
  &.error {
    color: red;
  }
`;

const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signUpEmail = useSelector(
    (state: RootState) => state.SignUp.signUpEmail
  );
  const signUpNickname = useSelector(
    (state: RootState) => state.SignUp.signUpNickname
  );
  const signUpPassword = useSelector(
    (state: RootState) => state.SignUp.signUpPassword
  );
  const signUpPasswordConfirm = useSelector(
    (state: RootState) => state.SignUp.signUpPasswordConfirm
  );
  const signUpIntroduction = useSelector(
    (state: RootState) => state.SignUp.signUpIntroduction
  );
  const signUpImg = useSelector((state: RootState) => state.SignUp.signUpImg);
  const emailMessage = useSelector(
    (state: RootState) => state.Validation.emailMessage
  );
  const isEmail = useSelector((state: RootState) => state.Validation.isEmail);
  const nickNameMessage = useSelector(
    (state: RootState) => state.Validation.nickNameMessage
  );
  const isNickName = useSelector(
    (state: RootState) => state.Validation.isNickName
  );
  const passwordMessage = useSelector(
    (state: RootState) => state.Validation.passwordMessage
  );
  const isPassword = useSelector(
    (state: RootState) => state.Validation.isPassword
  );
  const passwordConfirmMessage = useSelector(
    (state: RootState) => state.Validation.passwordConfirmMessage
  );
  const isPasswordConfirm = useSelector(
    (state: RootState) => state.Validation.isPasswordConfirm
  );
  const introductionMessage = useSelector(
    (state: RootState) => state.Validation.introductionMessage
  );
  const isIntroduction = useSelector(
    (state: RootState) => state.Validation.isIntroduction
  );
  const isUpload = useSelector((state: RootState) => state.Validation.isUpload);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.currentTarget.value;
    dispatch(setEmail(emailCurrent));
    if (!emailRegex.test(emailCurrent)) {
      dispatch(setEmailMessage("이메일 형식이 틀렸어요! 다시 확인해주세요"));
      dispatch(setIsEmail(false));
    } else {
      dispatch(setEmailMessage("올바른 이메일 형식입니다 :)"));
      dispatch(setIsEmail(true));
    }
  };

  const handleNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nicknameRegex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;
    const nickNameCurrent = e.currentTarget.value;
    dispatch(setNickname(nickNameCurrent));
    if (!nicknameRegex.test(nickNameCurrent)) {
      dispatch(
        setNickNameMessage("영문 또는 한글 2자 이상 16자 이하로 입력해주세요")
      );
      dispatch(setIsNickName(false));
    } else {
      dispatch(setNickNameMessage("올바른 닉네임 형식입니다 :)"));
      dispatch(setIsNickName(true));
    }
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
    const passwordCurrent = e.currentTarget.value;
    dispatch(setPassword(passwordCurrent));
    if (!passwordRegex.test(passwordCurrent)) {
      dispatch(
        setPasswordMessage(
          "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
        )
      );
      dispatch(setIsPassword(false));
    } else {
      dispatch(setPasswordMessage("안전한 비밀번호입니다 :)"));
      dispatch(setIsPassword(true));
    }
  };

  const handlePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordConfirmCurrent = e.currentTarget.value;
    dispatch(setPasswordConfirm(passwordConfirmCurrent));
    if (signUpPassword === passwordConfirmCurrent) {
      dispatch(setPasswordConfirmMessage("비밀번호가 같습니다 :)"));
      dispatch(setIsPasswordConfirm(true));
    } else {
      dispatch(setPasswordConfirmMessage("비밀번호가 다릅니다"));
      dispatch(setIsPasswordConfirm(false));
    }
  };

  const handleIntroduction = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setIntroduction(e.currentTarget.value));
    dispatch(setIsIntroduction(true));
    if (e.currentTarget.value.length > 150) {
      dispatch(setIntroductionMessage("150자를 초과했습니다"));
      dispatch(setIsIntroduction(false));
    }
  };

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      dispatch(setImage(e.currentTarget.files[0]));
      dispatch(setIsUpload(true));
      if (e.currentTarget.files.length === 0) {
        dispatch(setImage(""));
        dispatch(setIsUpload(false));
      }
    }
  };

  const handleSignUp = async () => {
    const formData = new FormData();
    const Data = {
      email: signUpEmail,
      nickName: signUpNickname,
      password: signUpPassword,
      about: signUpIntroduction,
    };
    formData.append(
      "key",
      new Blob([JSON.stringify(Data)], {
        type: "application/json",
      })
    );
    formData.append("image", signUpImg);
    axios
      .post(
        "http://ec2-3-39-239-42.ap-northeast-2.compute.amazonaws.com:8080/members",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res);
        alert(`환영합니다!! ${signUpNickname}님 \n로그인을 해주세요`);
        navigate("/login", { replace: true });
        navigate(0);
      })
      .catch((err) => {
        console.log(err);
        alert(`유효하지 않거나 이미 등록된 회원입니다`);
        navigate(0);
      });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSignUp();
  };

  return (
    <SignUpBox onSubmit={handleSubmit}>
      <InputSection>
        <label htmlFor={"email"}>이메일</label>
        <InputBox
          id={"email"}
          type={"email"}
          name={"email"}
          width={"350px"}
          placeholder={"최대 50자 @을 포함한 이메일 형식"}
          onChange={handleEmail}
        />
        {signUpEmail.length > 0 && (
          <StyledSpan className={`${isEmail ? "success" : "error"}`}>
            {emailMessage}
          </StyledSpan>
        )}
      </InputSection>
      <InputSection>
        <label htmlFor={"nickname"}>닉네임</label>
        <InputBox
          id={"nickname"}
          type={"text"}
          name={"nickname"}
          width={"350px"}
          placeholder={"영문 또는 한글 2자 이상 16자 이하"}
          onChange={handleNickName}
        />
        {signUpNickname.length > 0 && (
          <StyledSpan className={`${isNickName ? "success" : "error"}`}>
            {nickNameMessage}
          </StyledSpan>
        )}
      </InputSection>
      <InputSection>
        <label htmlFor={"password"}>비밀번호</label>
        <InputBox
          id={"password"}
          type={"password"}
          name={"password"}
          width={"350px"}
          placeholder={"8자 이상 영문, 숫자, 특수문자 포함"}
          onChange={handlePassword}
        />
        {signUpPassword.length > 0 && (
          <StyledSpan className={`${isPassword ? "success" : "error"}`}>
            {passwordMessage}
          </StyledSpan>
        )}
      </InputSection>
      <InputSection>
        <label htmlFor={"passwordConfirm"}>비밀번호 확인</label>
        <InputBox
          id={"passwordConfirm"}
          type={"password"}
          name={"passwordConfirm"}
          width={"350px"}
          placeholder={"비밀번호를 다시 입력해주세요 (대소문자 구분)"}
          onChange={handlePasswordConfirm}
        />
        {signUpPasswordConfirm.length > 0 && (
          <StyledSpan className={`${isPasswordConfirm ? "success" : "error"}`}>
            {passwordConfirmMessage}
          </StyledSpan>
        )}
      </InputSection>
      <IntroduceSection>
        <label htmlFor={"introduction"}>자기소개</label>
        <StyledTextArea
          id={"introduction"}
          name={"introduction"}
          width={"350px"}
          placeholder={"내용을 입력해주세요(150자 이내)"}
          onChange={handleIntroduction}
        />
        {isIntroduction ? (
          <StyledSpan></StyledSpan>
        ) : (
          <StyledSpan className={"error"}>{introductionMessage}</StyledSpan>
        )}
      </IntroduceSection>
      <UploadSection>
        <label htmlFor={"file"}>프로필 사진</label>
        <InputBox
          id={"file"}
          type={"file"}
          name={"file"}
          width={"350px"}
          placeholder={"이미지 파일"}
          onChange={uploadImage}
        />
      </UploadSection>
      <InputSection>
        <Button
          color={"#6F38C5"}
          width={"350px"}
          type={"submit"}
          disabled={
            !(
              isEmail &&
              isNickName &&
              isPassword &&
              isPasswordConfirm &&
              isIntroduction &&
              isUpload
            )
          }
        >
          회원가입
        </Button>
      </InputSection>
    </SignUpBox>
  );
};

export default SignUpForm;
