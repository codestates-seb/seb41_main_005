import React from "react";
import styled from "styled-components";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const StyledInput = styled.input<InputProps>`
  height: 2.5rem;
  width: ${(props) => props.width};
  margin: 1rem 1rem 0 1rem;
  padding-left: 10px;
  padding-right: 5px;
  border: solid 1px ${(props) => props.theme.color.sub2};
  border-radius: 8px;
  outline: none;
  :hover {
    border: solid 1px ${(props) => props.theme.color.main};
    -webkit-transition: 0.25s;
    transition: 0.25s;
    outline: none;
  }
  :focus {
    border: solid 1px ${(props) => props.theme.color.main};
    -webkit-transition: 0.25s;
    transition: 0.25s;
    outline: none;
  }
`;

const InputBox = (props: InputProps) => {
  return (
    <>
      <StyledInput {...props} />
    </>
  );
};

export default InputBox;
