import React from "react";
import styled from "styled-components";
import InputBox from "../Input";
import Button from "../Buttons";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { RiKakaoTalkFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../util/redux";
import {
  setLogInEmail,
  setLogInPassword,
  setIsLogIn,
  setImgUrl,
  setLogInNickname,
  setLogInIntroduction,
} from "../../util/redux/LogIn";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { onLogInSuccess } from "../../util/logInApi";

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
  const logInEmail = useSelector((state: RootState) => state.LogIn.logInEmail);
  const logInPassword = useSelector(
    (state: RootState) => state.LogIn.logInPassword
  );

  const handleLoginEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setLogInEmail(e.currentTarget.value));
  };

  const handleLoginPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setLogInPassword(e.currentTarget.value));
  };

  const handleLogIn = async () => {
    axios
      .post(
        "http://ec2-43-201-27-162.ap-northeast-2.compute.amazonaws.com:8080/auth/login",
        {
          username: logInEmail,
          password: logInPassword,
        }
      )
      .then((res) => {
        onLogInSuccess(res);
        dispatch(setIsLogIn(true));
        dispatch(setImgUrl(res.data.pictureUrl));
        dispatch(setLogInNickname(res.data.nickName));
        dispatch(setLogInIntroduction(res.data.about));
        alert(`어서오세요 ${res.data.nickName}님 :)`);
        navigate("/", { replace: true });
        navigate(0);
      })
      .catch((err) => {
        console.log(err);
        alert("회원이 아니거나 이메일 비밀번호가 다릅니다");
      });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleLogIn();
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
        <Button
          color={"#6F38C5"}
          width={"300px"}
          type={"submit"}
          disabled={!(logInEmail && logInPassword)}
        >
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
        <Link to={"/signup"}>회원가입</Link>
      </InputSection>
    </LoginBox>
  );
};

export default LogInForm;
