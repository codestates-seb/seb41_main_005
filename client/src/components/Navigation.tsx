import React from "react"; // eslint-disable-line no-unused-vars
import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/logo.svg";
import Button from "./Buttons";
import { Link } from "react-router-dom";

const Block = styled.div`
  display: block;
`;

const NavBar = styled.div`
  width: 100vw;
  height: 65px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 2px 10px -5px;
  position: fixed;
  background-color: #ffffff;
  z-index: 900;
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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const LogInContainer = styled.div`
  /* margin-right: 40px; */
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 1rem;
`;

const Navigation = () => {
  return (
    <Block>
      <NavBar>
        <LogoContainer href="/">
          <Logo width={65} height={65} />
        </LogoContainer>
        <LinkContainer>
          <LinkButton>
            <StyledLink to="/">홈</StyledLink>
          </LinkButton>
          <LinkButton>
            <StyledLink to="/hire">구인</StyledLink>
          </LinkButton>
          <LinkButton>
            <StyledLink to="/hunting">구직</StyledLink>
          </LinkButton>
        </LinkContainer>
        <LogInContainer>
          <StyledLink to="/login">
            <Button color={"#6667AB"} width={"5rem"}>
              로그인
            </Button>
          </StyledLink>
          <StyledLink to="/signup">
            <Button color={"#6F38C5"} width={"5rem"}>
              회원가입
            </Button>
          </StyledLink>
        </LogInContainer>
      </NavBar>
    </Block>
  );
};

export default Navigation;
