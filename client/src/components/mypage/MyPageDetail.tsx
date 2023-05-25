import React from "react";
import styled from "styled-components";
import Profile from "../Profile";
import EditForm from "./EditForm";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../util/redux";
import Button from "../Buttons";
import axios from "axios";
import { removeCookie } from "../../util/cookie";
import { useNavigate } from "react-router-dom";
import { setIsLogIn } from "../../util/redux/LogIn";
import { BASE_URL } from "../../api/getUrl";

const SideSection = styled.div`
  display: flex;
  width: 250px;
  height: 100vh;
  margin: 4rem 2rem 4rem 0;
  flex-direction: column;
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  flex-grow: 1;
`;

const ProfileBox = styled.div`
  display: flex;
  border: 1px solid ${(props) => props.theme.color.back};
  width: 250px;
  height: 220px;
  margin-bottom: 2rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const LinkBox = styled.div`
  display: flex;
  border: 1px solid ${(props) => props.theme.color.back};
  width: 250px;
  height: auto;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
`;

const LinkButton = styled.button`
  width: 4rem;
  margin: 0.5rem 1rem 1rem 1rem;
  border: none;
  background-color: #ffffff;
  font-size: ${(props) => props.theme.font.medium};
  line-height: 30px;
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
`;

const StyledSpan = styled.span`
  font-size: 16px;
  margin: 1rem 0 0 0;
`;

const ButtonContainer = styled.div`
  width: 504px;
  height: auto;
  display: flex;
  justify-content: right;
`;

const MyPageDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logInEmail = useSelector((state: RootState) => state.LogIn.logInEmail);
  const logInNickname = useSelector(
    (state: RootState) => state.LogIn.logInNickname
  );
  const handleDelete = async () => {
    const result = confirm("정말 탈퇴 하시겠습니까?");
    if (result) {
      axios
        .delete(`${BASE_URL}/members`)
        .then((res) => {
          dispatch(setIsLogIn(false));
          localStorage.clear();
          removeCookie("refresh");
          alert("탈퇴 처리 되었습니다\n이용해주셔서 감사합니다");
          navigate("/login", { replace: true });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <SideSection>
        <ProfileBox>
          <Profile width={"100px"} height={"100px"} />
          <StyledSpan>{logInNickname}</StyledSpan>
          <StyledSpan>{logInEmail}</StyledSpan>
        </ProfileBox>
        <LinkBox>
          <LinkButton>프로필</LinkButton>
          <LinkButton>게시글</LinkButton>
          <LinkButton>리뷰</LinkButton>
        </LinkBox>
      </SideSection>
      <MainSection>
        <EditForm />
        <ButtonContainer>
          <Button color={"#6667AB"} width={"100px"} onClick={handleDelete}>
            회원탈퇴
          </Button>
        </ButtonContainer>
      </MainSection>
    </>
  );
};

export default MyPageDetail;
