import Button from "../../components/Buttons";
import cat from "../../assets/cat.jpg";
import styled from "styled-components";

const Container = styled.div`
  align-items: center;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  margin: 10px 5px 10px 5px;
  padding: 20px;
  border: 1px solid #a9a9a9;
  border-radius: 2px;
  .profile {
    display: flex;
    flex-direction: row;
  }
  img {
    width: 55px;
    height: 55px;
    border-radius: 50px;
  }
  .block {
    display: block;
    margin-left: 10px;
    line-height: 28px;
    .reputation {
      margin-right: 60px;
    }
  }
  .title {
    color: #6667ab;
    padding-right: 10px;
  }
  Button {
    margin-right: 0px;
  }
`;

export default function UserInfo({ data }: { data: any }) {
  return (
    <Container>
      <div className="profile">
        <img src={cat} alt="" />
        <div className="block">
          <div>
            <span className="title">닉네임</span>
            <span>{data.nickname}</span>
          </div>
          <div>
            <span className="title">평판</span>
            <span className="reputation">{data.status}</span>
            <span className="title">리뷰</span>
            <span>{data.review_count}</span>
          </div>
        </div>
      </div>
      <Button color={"#6F38C5"} width={"150px"}>
        상세보기
      </Button>
    </Container>
  );
}
