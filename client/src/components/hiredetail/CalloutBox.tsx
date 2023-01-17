import Button from "../../components/Buttons";
import styled from "styled-components";

const Container = styled.aside`
  width: 340px;
  font-size: 16px;
  border: 1px solid #a9a9a9;
  border-radius: 2px;
  padding: 10px 0px 20px 11px;
  div {
    margin: 10px;
    span {
      padding-right: 10px;
    }
    .title {
      color: #6667ab;
    }
  }
`;

export default function CalloutBox({
  data,
  isDisable,
  handlebutton,
}: {
  data: any;
  isDisable: any;
  handlebutton: any;
}) {
  return (
    <Container>
      <div>
        <span className="title">업무 시간</span>
        <span>{data.worktime}</span>
      </div>
      <div>
        <span className="title">장소</span>
        <span>{data.location}</span>
      </div>
      <div>
        <span className="title">보수</span>
        <span>{data.price}</span>
      </div>
      <Button
        color={"#6F38C5"}
        width={"300px"}
        disabled={!isDisable}
        onClick={() => handlebutton()}
      >
        지원하기
      </Button>
    </Container>
  );
}
