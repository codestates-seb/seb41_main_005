import styled from "styled-components";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const StyledButton = styled.button`
  margin-right: 1rem;
  width: 5rem;
  height: 2.5rem;
  font-size: 16px;
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
