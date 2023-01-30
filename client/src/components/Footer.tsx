import React from "react";
import { ReactComponent as Logo } from "../assets/logo.svg";
import styled from "styled-components";

const FooterContainer = styled.div`
  height: 150px;
  box-shadow: 0 2px 10px -5px;
  width: 100%;
  display: block;
`;

const StyledFooter = styled.footer`
  display: flex;
  max-width: 1060px;
  justify-content: space-between;
  margin: auto;
  background-color: #ffffff;
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
    <FooterContainer>
      <StyledFooter>
        <Container>
          <Logo width={100} height={100} />
          <CopyRight>
            Copyright © (주)느낌오조?!. All Rights Reserved.
          </CopyRight>
        </Container>
      </StyledFooter>
    </FooterContainer>
  );
};

export default Footer;
