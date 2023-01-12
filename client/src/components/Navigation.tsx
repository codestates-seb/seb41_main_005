import React from "react"; // eslint-disable-line no-unused-vars
import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/logo.svg";
import Button from "./Buttons";

const NavBar = styled.div`
  width: 100vw;
  height: 65px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 2px 10px -5px;
  position: fixed;
`;

const LogoContainer = styled.a`
  /* margin-left: 40px; */
`;

const LinkContainer = styled.div`
  display: flex;
  flex-grow: 0.5;
`;

// eslint-disable-line no-unused-vars
const LinkButton = styled.button`
  width: 5rem;
  margin-right: 1rem;
  border: none;
  background-color: #ffffff;
  font-size: ${(props) => props.theme.font.nav};
  line-height: 62px;
  :after {
    display: block;
    content: "";
    border-bottom: solid 3px ${(props) => props.theme.color.sub1};
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
  }
  :hover:after {
    transform: scaleX(1);
  }
  .fromRight:after {
    transform-origin: 100% 50%;
  }
  .fromLeft:after {
    transform-origin: 0% 50%;
  }
`;

const LogInContainer = styled.div`
  /* margin-right: 40px; */
  display: flex;
  align-items: center;
`;

const Navigation = () => {
  return (
    <NavBar>
      <LogoContainer href="/">
        <Logo />
      </LogoContainer>
      <LinkContainer>
        <LinkButton>홈</LinkButton>
        <LinkButton>구인</LinkButton>
        <LinkButton>구직</LinkButton>
      </LinkContainer>
      <LogInContainer>
        <Button color="#6667AB">로그인</Button>
        <Button color="#6F38C5">회원가입</Button>
      </LogInContainer>
    </NavBar>
  );
};

export default Navigation;
