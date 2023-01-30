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
import { setIsLogIn, setTabNum } from "../util/redux/LogIn";

const Block = styled.div`
  display: block;
  height: 65px;
  width: 100%;
  box-shadow: 0 2px 10px -5px;
  position: fixed;
  z-index: 900;
`;

const NavBar = styled.div`
  display: flex;
  height: 65px;
  max-width: 1060px;
  justify-content: space-between;
  margin: auto;
  background-color: #ffffff;
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
`;

const TapWrapper = styled.div<{ isHere?: boolean }>`
  ${(props) => (props.isHere ? "border-bottom: solid 3px #6F38C5;" : null)}
  ::after {
    display: block;
    content: "";
    ${(props) => (props.isHere ? null : "border-bottom: solid 3px #6F38C5;")}
    /* border-bottom: solid 3px ${(props) => props.theme.color.sub1}; */
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
  }
  &:hover::after {
    transform: scaleX(1);
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
  display: flex;
  align-items: center;
  text-align: center;
  width: 250px;
  justify-content: right;
  padding: 0 0 0 1rem;
`;

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogIn = useSelector((state: RootState) => state.LogIn.isLogIn);
  const tabNum = useSelector((state: RootState) => state.LogIn.tabNum);

  // 로그아웃 함수
  const handleLogOut = async () => {
    const result = confirm("정말 로그아웃 하시겠습니까?");
    if (result) {
      axios
        .post(
          "http://ec2-3-39-239-42.ap-northeast-2.compute.amazonaws.com:8080/auth/logout"
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
        <ImgWrapper href={"/"} onClick={() => dispatch(setTabNum(0))}>
          <Logo width={65} height={65} />
        </ImgWrapper>
        <LinkContainer>
          <UnderLineLink to={"/"}>
            <TapWrapper
              isHere={tabNum === 0}
              onClick={() => dispatch(setTabNum(0))}
            >
              홈
            </TapWrapper>
          </UnderLineLink>
          <UnderLineLink to={"/hire"}>
            <TapWrapper
              isHere={tabNum === 1}
              onClick={() => dispatch(setTabNum(1))}
            >
              구인
            </TapWrapper>
          </UnderLineLink>
          <UnderLineLink to={"/hunting"}>
            <TapWrapper
              isHere={tabNum === 2}
              onClick={() => dispatch(setTabNum(2))}
            >
              구직
            </TapWrapper>
          </UnderLineLink>
        </LinkContainer>
        <LogInContainer>
          {isLogIn ? (
            <>
              <Link to={"/mypage"} onClick={() => dispatch(setTabNum(4))}>
                <Profile width={"40px"} height={"40px"} />
              </Link>
              <Link to={"/schedule"} onClick={() => dispatch(setTabNum(4))}>
                <SvgContainer>
                  <MdOutlineEditCalendar className={"schedule"} size={42} />
                </SvgContainer>
              </Link>
              <Button
                color={"#6F38C5"}
                width={"5rem"}
                onClick={() => {
                  handleLogOut();
                  dispatch(setTabNum(4));
                }}
              >
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <ButtonLink
                onClick={() => dispatch(setTabNum(4))}
                to={"/login"}
                color={"#6667AB"}
              >
                로그인
              </ButtonLink>
              <ButtonLink
                onClick={() => dispatch(setTabNum(4))}
                to={"/signup"}
                color={"#6F38C5"}
              >
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
