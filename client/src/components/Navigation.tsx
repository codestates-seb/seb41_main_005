import React from "react"; // eslint-disable-line no-unused-vars
import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/logo.svg";
import Button from "./Buttons";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../util/redux";
import { MdOutlineEditCalendar } from "react-icons/md";
import Profile from "./Profile";
import axios from "axios";
import { removeCookie } from "../util/cookie";
import { setIsLogIn } from "../util/redux/LogIn";

const Block = styled.div`
  display: block;
`;

const NavBar = styled.div`
  width: 100%;
  height: 65px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 2px 10px -5px;
  padding: 0 180px;
  position: fixed;
  background-color: #ffffff;
  z-index: 900;
`;

const ImgWrapper = styled.a`
  /* margin-left: 40px; */
`;

const LinkContainer = styled.div`
  display: flex;
  flex-grow: 0.5;
  text-align: center;
`;

interface AnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  color?: string | undefined;
}

const ButtonLink = styled(Link)<AnchorProps>`
  text-decoration: none;
  width: 5rem;
  margin: 0 0 0 1rem;
  height: 2.5rem;
  font-size: ${(props) => props.theme.font.medium};
  border: none;
  line-height: 37px;
  border-radius: 4px;
  color: #ffffff;
  background-color: ${(props) => props.color};
  &:hover {
    background-color: ${(props) => props.theme.color.main};
    transition: all 0.5s;
  }
  &:disabled {
    background-color: ${(props) => props.theme.color.back};
  }
`;

const UnderLineLink = styled(Link)`
  text-decoration: none;
  color: black;
  width: 5rem;
  margin-right: 1rem;
  border: none;
  align-items: center;
  background-color: #ffffff;
  font-size: ${(props) => props.theme.font.nav};
  line-height: 62px;
  ::after {
    display: block;
    content: "";
    border-bottom: solid 3px ${(props) => props.theme.color.sub1};
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
  }
  &:hover::after {
    transform: scaleX(1);
  }
  &.active {
    border-bottom: solid 3px ${(props) => props.theme.color.sub1};
  }
`;

const SvgContainer = styled.div`
  margin: 0 1.5rem 0 1rem;
  color: ${(props) => props.theme.color.sub1};
  &:hover {
    .schedule {
      color: ${(props) => props.theme.color.main};
      transition: all 0.5s;
    }
  }
`;

const LogInContainer = styled.div`
  /* margin-right: 40px; */
  display: flex;
  /* justify-content: space-around; */
  align-items: center;
  text-align: center;
  padding: 0 0 0 1rem;
`;

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogIn = useSelector((state: RootState) => state.LogIn.isLogIn);

  // 로그아웃 함수
  const handleLogOut = async () => {
    const result = confirm("정말 로그아웃 하시겠습니까?");
    if (result) {
      axios
        .post(
          "http://ec2-43-201-27-162.ap-northeast-2.compute.amazonaws.com:8080/auth/logout"
        )
        .then((res) => {
          dispatch(setIsLogIn(false));
          localStorage.clear();
          removeCookie("refresh");
          alert(res.data.message);
          navigate("/login", { replace: true });
        })
        .catch((err) => {
          console.log(err);
          alert("로그아웃에 실패했습니다");
        });
    }
  };

  return (
    <Block>
      <NavBar>
        <ImgWrapper href={"/"}>
          <Logo width={65} height={65} />
        </ImgWrapper>
        <LinkContainer>
          <UnderLineLink to={"/"}>홈</UnderLineLink>
          <UnderLineLink to={"/hire"}>구인</UnderLineLink>
          <UnderLineLink to={"/hunting"}>구직</UnderLineLink>
        </LinkContainer>
        <LogInContainer>
          {isLogIn ? (
            <>
              <Link to={"/mypage"}>
                <Profile width={"40px"} height={"40px"} />
              </Link>
              <Link to={"/schedule"}>
                <SvgContainer>
                  <MdOutlineEditCalendar className={"schedule"} size={42} />
                </SvgContainer>
              </Link>
              <Button color={"#6F38C5"} width={"5rem"} onClick={handleLogOut}>
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <ButtonLink to={"/login"} color={"#6667AB"}>
                로그인
              </ButtonLink>
              <ButtonLink to={"/signup"} color={"#6F38C5"}>
                회원가입
              </ButtonLink>
            </>
          )}
        </LogInContainer>
      </NavBar>
    </Block>
  );
};

export default Navigation;
