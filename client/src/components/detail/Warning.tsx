import styled from "styled-components";

const Container = styled.div`
  margin: 5px;
  padding: 10px;
  font-size: 12px;
  background-color: #fafafa;
`;

export default function Warning({ nickName }: { nickName: string }) {
  return (
    <Container>
      <p>
        {`본 정보는 ${nickName}에서 제공한 자료입니다. gigker 동의 없이 재배포할 수 없으며,
        채용기업과 담당자 정보는 구직활동 외의 용도로 사용할 수 없습니다.
        gigker는 기재된 내용에 대한 오류와 사용자가 이를 신뢰하여 취한 조치에
        대해 책임을 지지 않습니다.`}
      </p>
    </Container>
  );
}
