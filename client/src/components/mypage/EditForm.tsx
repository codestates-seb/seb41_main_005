import React from "react";
import styled from "styled-components";
import InputBox from "../Input";
import Button from "../Buttons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../util/redux";
import axios from "axios";
import {
  setNickname,
  setIntroduction,
  setImage,
} from "../../util/redux/SignUp";
import {
  setNickNameMessage,
  setIsNickName,
  setIntroductionMessage,
  setIsIntroduction,
  setIsUpload,
} from "../../util/redux/Validation";
import {
  setImgUrl,
  setLogInNickname,
  setLogInIntroduction,
} from "../../util/redux/LogIn";
import { useNavigate } from "react-router-dom";
import { blob } from "stream/consumers";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

const SignUpBox = styled.form<FormProps>`
  width: 40rem;
  height: auto;
  display: flex;
  flex-direction: column;
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

const ButtonSection = styled.div`
  margin: 1rem 0 0 0;
  height: 5rem;
  display: flex;
  flex-direction: row;
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

const EditForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signUpNickname = useSelector(
    (state: RootState) => state.SignUp.signUpNickname
  );
  const signUpIntroduction = useSelector(
    (state: RootState) => state.SignUp.signUpIntroduction
  );
  const nickNameMessage = useSelector(
    (state: RootState) => state.Validation.nickNameMessage
  );
  const isNickName = useSelector(
    (state: RootState) => state.Validation.isNickName
  );
  const introductionMessage = useSelector(
    (state: RootState) => state.Validation.introductionMessage
  );
  const isIntroduction = useSelector(
    (state: RootState) => state.Validation.isIntroduction
  );
  const isUpload = useSelector((state: RootState) => state.Validation.isUpload);
  const signUpImg = useSelector((state: RootState) => state.SignUp.signUpImg);
  const logInNickname = useSelector(
    (state: RootState) => state.LogIn.logInNickname
  );
  const logInIntroduction = useSelector(
    (state: RootState) => state.LogIn.logInIntroduction
  );

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

  const handleEdit = async () => {
    const formData = new FormData();
    const Data: any = {};
    if (signUpNickname !== "") {
      Data.nickName = signUpNickname;
    }
    if (signUpIntroduction !== "") {
      Data.about = signUpIntroduction;
    }
    formData.append(
      "key",
      new Blob([JSON.stringify(Data)], {
        type: "application/json",
      })
    );
    if (signUpImg === "") {
      formData.append("image", new Blob());
    } else {
      formData.append("image", signUpImg);
    }

    axios
      .patch(
        "http://ec2-54-180-116-246.ap-northeast-2.compute.amazonaws.com:8080/members",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        dispatch(setImgUrl(res.data.pictureUrl));
        dispatch(setLogInNickname(res.data.nickName));
        dispatch(setLogInIntroduction(res.data.about));
        alert("수정되었습니다!");
        navigate(0);
      })
      .catch((err) => {
        alert("중복된 닉네임입니다");
      });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleEdit();
  };

  return (
    <SignUpBox onSubmit={handleSubmit}>
      <InputSection>
        <label htmlFor={"nickname"}>닉네임</label>
        <InputBox
          id={"nickname"}
          type={"text"}
          name={"nickname"}
          width={"350px"}
          placeholder={logInNickname}
          onChange={handleNickName}
        />
        {signUpNickname.length > 0 && (
          <StyledSpan className={`${isNickName ? "success" : "error"}`}>
            {nickNameMessage}
          </StyledSpan>
        )}
      </InputSection>
      <IntroduceSection>
        <label htmlFor={"introdution"}>자기소개</label>
        <StyledTextArea
          id={"introduction"}
          name={"introduction"}
          width={"350px"}
          placeholder={logInIntroduction}
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
          onChange={uploadImage}
        />
      </UploadSection>
      <ButtonSection>
        <Button
          color={"#6F38C5"}
          width={"350px"}
          type={"submit"}
          disabled={!(isNickName || isIntroduction || isUpload)}
        >
          수정하기
        </Button>
      </ButtonSection>
    </SignUpBox>
  );
};

export default EditForm;
