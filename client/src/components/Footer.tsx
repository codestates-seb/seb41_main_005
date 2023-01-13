import React from "react";
import { ReactComponent as Logo } from "../assets/logo.svg";
import styled from "styled-components";

const StyledFooter = styled.footer`
  height: 150px;
  box-shadow: 0 2px 10px -5px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const CopyRight = styled.div`
  font-size: ${(props) => props.theme.font.small};
`;

const Footer = () => {
  return (
    <StyledFooter>
      <Container>
        <Logo width={100} height={100} />
        <CopyRight>Copyright © (주)느낌오조?!. All Rights Reserved.</CopyRight>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
