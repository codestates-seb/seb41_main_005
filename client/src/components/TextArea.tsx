import React from "react";
import styled from "styled-components";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const StyledTextArea = styled.textarea<TextAreaProps>`
  height: 7rem;
  width: 600px;
  margin: 0.5rem 1rem 0 1rem;
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

const TextArea = (props: TextAreaProps) => {
  return (
    <>
      <StyledTextArea {...props} />
    </>
  );
};

export default TextArea;
