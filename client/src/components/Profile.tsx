import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../util/redux";

interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const ImgContainer = styled.div<ImgProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: 0 1rem;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Profile = (props: ImgProps) => {
  const imgUrl = useSelector((state: RootState) => state.LogIn.imgUrl);

  return (
    <ImgContainer {...props}>
      <img src={imgUrl} />
    </ImgContainer>
  );
};

export default Profile;
