import React from "react";
import InputBox from "../components/Input";
import styled from 'styled-components';

const EditHire = () => {
  return (
    <EditHireContainer>
      <WithTitle>제목
        <InputBox width="600px" />
      </WithTitle>
      <WithTitle>카테고리
        <InputBox width="600px" /></WithTitle>
      <WithTitle>업무시간
        <InputBox width="600px" /></WithTitle>
      <ThreeInput>
        <WithTitle>모집인원
          <InputBox width="165px" /></WithTitle>
        <WithTitle>보수
          <InputBox width="165px" /></WithTitle>
        <WithTitle>장소
          <InputBox width="165px" /></WithTitle>
      </ThreeInput>
      <WithTitle>업무내용
        <InputBox width="600px" /></WithTitle>
      <WithTitle>자격요건
        <InputBox width="600px" /></WithTitle>
      <WithTitle>우대사항 (선택)
        <InputBox width="600px" /></WithTitle>
      <WithTitle>기타 (선택)
        <InputBox width="600px" /></WithTitle>
    </EditHireContainer>
  );
};

const EditHireContainer = styled.div`
padding: 100px 50px 50px 50px;
display: flex;
flex-direction: column;
$ {InputBox} { 
  align-items: center;
}
`
const WithTitle = styled.div`
display: flex;
flex-direction: column;
padding: 10px;
`
const ThreeInput = styled.div`
display: flex;
flex-direction: row;
`
export default EditHire;