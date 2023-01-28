import Button from "../Buttons";
import styled from "styled-components";
import { transDateTime } from "../main/transDateTime";

const Container = styled.aside`
  width: 340px;
  font-size: 16px;
  border: 1px solid #a9a9a9;
  border-radius: 2px;
  padding: 10px;
  background-color: #fff;
  line-height: 1.4;
  div {
    margin: 10px;
    span {
      padding-right: 10px;
    }
    .title {
      color: #6667ab;
    }
  }
  .time {
    display: flex;
    flex-direction: row;
  }
  Button {
    margin: 0px 10px 14px 10px;
  }
`;

export default function CalloutBox({
  data,
  isLogin,
  handlebutton,
}: {
  data: any;
  isLogin: boolean;
  handlebutton: any;
}) {
  return (
    <Container>
      <div className="time">
        <span className="title">
          {data.type === "buy" ? "업무 시간" : "희망 시간"}
        </span>

        {/* {transDateTime(data.workTimes)} */}
        <ul>
          {transDateTime(data.workTimes).map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <span className="title">
          {data.type === "buy" ? "장소" : "희망 장소"}
        </span>
        <span>{data.cityName}</span>
      </div>
      <div>
        <span className="title">
          {data.type === "buy" ? "보수" : "희망 보수"}
        </span>
        <span>
          {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
        </span>
      </div>
      {isLogin ? (
        <Button
          color={"#6F38C5"}
          width={"299px"}
          onClick={() => handlebutton()}
        >
          지원하기
        </Button>
      ) : (
        <Button color={"#6F38C5"} width={"299px"} disabled={true}>
          지원하기
        </Button>
      )}
    </Container>
  );
}
