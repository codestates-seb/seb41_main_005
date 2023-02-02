import React from "react";
import { ReactComponent as Logo } from "../assets/logo.svg";
import styled from "styled-components";
import { RiGitRepositoryFill } from "react-icons/ri";
import { AiFillYoutube, AiFillGithub } from "react-icons/ai";

const FooterContainer = styled.div`
  height: 150px;
  box-shadow: 0 2px 10px -5px;
  width: 100%;
  display: block;
`;

const StyledFooter = styled.footer`
  display: flex;
  width: 100%;
  max-width: 1060px;
  justify-content: space-between;
  margin: auto;
  background-color: #ffffff;
  flex-wrap: wrap;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CopyRight = styled.div`
  font-size: ${(props) => props.theme.font.small};
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  color: #a9a9a9;
  flex-wrap: wrap;
`;

const ProjectSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-right: 20px;
`;
const PersonalSection = styled.div`
  display: flex;
  margin-top: 10px;
`;
const FeMember = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
`;
const BeMember = styled.div`
  display: flex;
  flex-direction: column;
`;

const LinkWrapper = styled.a`
  display: flex;
  padding: 2px;
  text-decoration: none;
  :visited {
    color: #a9a9a9;
  }
`;

const IconContainer = styled.div`
  padding-top: 3px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <StyledFooter>
        <LogoContainer>
          <Logo width={100} height={100} />
          <CopyRight>
            Copyright © (주)느낌오조?!. All Rights Reserved.
          </CopyRight>
        </LogoContainer>
        <LinkContainer>
          <ProjectSection>
            <LinkWrapper
              href={"https://github.com/codestates-seb/seb41_main_005"}
              target={"_blank"}
            >
              <IconContainer>
                <RiGitRepositoryFill size={20} />
              </IconContainer>
              <span>Repository</span>
            </LinkWrapper>
            <LinkWrapper
              href={"https://www.youtube.com/watch?v=RloIArKcnZo"}
              target={"_blank"}
            >
              <IconContainer>
                <AiFillYoutube size={20} />
              </IconContainer>{" "}
              <span>Youtube</span>
            </LinkWrapper>
          </ProjectSection>
          <PersonalSection>
            <FeMember>
              <LinkWrapper
                href={"https://github.com/dongrri22"}
                target={"_blank"}
              >
                <IconContainer>
                  <AiFillGithub size={20} />
                </IconContainer>
                <span>FE 권해정</span>
              </LinkWrapper>
              <LinkWrapper
                href={"https://github.com/jannyshim"}
                target={"_blank"}
              >
                <IconContainer>
                  <AiFillGithub size={20} />
                </IconContainer>
                <span>FE 심지원</span>
              </LinkWrapper>
              <LinkWrapper href={"https://github.com/hyob12"} target={"_blank"}>
                <IconContainer>
                  <AiFillGithub size={20} />
                </IconContainer>
                <span>FE 채효병</span>
              </LinkWrapper>
            </FeMember>
            <BeMember>
              <LinkWrapper
                href={"https://github.com/harrisonk213"}
                target={"_blank"}
              >
                <IconContainer>
                  <AiFillGithub size={20} />
                </IconContainer>
                <span>BE 김현성</span>
              </LinkWrapper>
              <LinkWrapper
                href={"https://github.com/maam6073"}
                target={"_blank"}
              >
                <IconContainer>
                  <AiFillGithub size={20} />
                </IconContainer>
                <span>BE 김도형</span>
              </LinkWrapper>
              <LinkWrapper
                href={"https://github.com/H-JWANNA"}
                target={"_blank"}
              >
                <IconContainer>
                  <AiFillGithub size={20} />
                </IconContainer>
                <span>BE 홍정완</span>
              </LinkWrapper>
            </BeMember>
          </PersonalSection>
        </LinkContainer>
      </StyledFooter>
    </FooterContainer>
  );
};

export default Footer;
