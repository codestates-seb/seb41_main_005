import styled from "styled-components";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width?: number | string | undefined;
}

const StyledButton = styled.button<ButtonProps>`
  width: ${(props) => props.width};
  margin: 0 0.5rem;
  height: 2.5rem;
  font-size: ${(props) => props.theme.font.medium};
  border: none;
  border-radius: 4px;
  color: #ffffff;
  background-color: ${(props) => props.color};
  &:hover {
    background-color: ${(props) => props.theme.color.main};
    transition: all 0.5s;
  }
`;

const Button = (props: ButtonProps) => {
  return <StyledButton {...props} />;
};

export default Button;
