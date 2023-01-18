import React from "react";
import styled from "styled-components";
import InputBox from "../Input";
import Button from "../Buttons";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { RiKakaoTalkFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../util/store";
import { setLogInEmail, setLogInPassword, setToken } from "../../util/types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  label {
    margin-left: 1rem;
  }
`;

const ButtonSection = styled.div`
  margin: 1rem 0;
  height: 5rem;
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
`;

const SocialLogin = styled.div`
  width: 300px;
  margin-top: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const LogInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logInEmail = useSelector((state: RootState) => state.logInEmail);
  const logInPassword = useSelector((state: RootState) => state.logInPassword);
  const token = useSelector((state: RootState) => state.token);
  const handleLoginEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setLogInEmail(e.currentTarget.value));
  };

  const handleLoginPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setLogInPassword(e.currentTarget.value));
  };

  const handleLogIn = async () => {
    axios
      .post("http://gigker.iptime.org:8080/auth", {
        username: logInEmail,
        password: logInPassword,
      })
      .then((res) => {
        dispatch(setToken(res.headers.autorization));
        console.log("token: " + token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleLogIn();
    navigate("/");
  };

  return (
    <LoginBox onSubmit={handleSubmit}>
      <InputSection>
        <label htmlFor={"email"}>이메일</label>
        <InputBox
          id={"email"}
          type={"email"}
          name={"email"}
          width={"300px"}
          placeholder={"이메일을 입력해주세요"}
          onChange={handleLoginEmail}
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
          onChange={handleLoginPassword}
        />
      </InputSection>
      <ButtonSection>
        <Button color={"#6F38C5"} width={"300px"} type={"submit"}>
          로그인
        </Button>
      </ButtonSection>
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
