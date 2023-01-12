import styled from "styled-components";

const Container = styled.div`
  box-sizing: border-box;
  display: block;
  max-width: 1060px;
  .wrapper {
    position: relative;
    .left {
      vertical-align: top;
      width: 700px;
      .header {
        line-height: 20px;
        border-bottom: 1px solid #a9a9a9;
        .title {
          display: flex;
          text-align: left;
          justify-content: space-between;
          font-size: 24px;
          font-weight: bold;
        }
        button {
          cursor: pointer;
          text-decoration: none;
          position: relative;
        }
        .tags {
          display: flex;
          margin-top: 20px
          font-size: 14px;
          ul {
            flex-direction: row;
          }
          li {
            list-style: none !important;
            display: inline-block;
            margin: 4px;
          }
        }
      }
      .description {
        span {
          font-size: 18px;
          font-weight: medium;
        }
        p {
          font-size: 16px;
        }
      }
      .profile {
        border: 1px solid #a9a9a9;
        border-radius: 2px;
      }
      .warning{
        font-size: 12px;
      }
    }
    .right {
      position: fixed;
      right: 314px;
      top: 70px;
      width: 340px;
      font-size: 16px;
      line-height: 20px;
      border: 1px solid #a9a9a9;
      border-radius: 2px;
    }
  }
`;

function HireDetail() {
  return (
    <Container>
      hire detail page
      <div className="wrapper">
        <div className="left">
          <section className="header">
            <div className="title">
              <p>설날 배송 알바 구합니다</p>
              <button>작성하기</button>
            </div>
            <div className="tags">
              <ul>
                <li>tag</li>
                <li>tag</li>
                <li>tag</li>
              </ul>
            </div>
          </section>
          <section className="description">
            <div>
              <span>모집 인원</span>
              <p>0명</p>
            </div>
            <span>업무 내용</span>
            <p>설날 서울, 경기권 배송 업무</p>
            <span>자격 요건</span>
            <p>1종 보통 면허 소지자</p>
            <span>우대 사항</span>
            <p>다마스, 라보, 승합차, 1톤 탑차, 냉동 탑차 소유자</p>
            <span>기타</span>
            <p>
              자세한 궁금한 사항은 전화 연락 바랍니다. 평일이나 주말에도 일이
              많으니 관심있으신 분들은 지원해주세요.
            </p>
          </section>
          <section className="profile">
            <img alt="">img</img>
            <span>작성자</span>
            <button>상세보기</button>
          </section>
          <section className="warning">warning</section>
        </div>
        <aside className="right">
          <div>
            <div>
              <span>날짜</span>
              <span>1월 20일</span>
            </div>
            <div>
              <span>시간</span>
              <span>11:00 ~ 18:00</span>
            </div>
            <div>
              <span>장소</span>
              <span>강남구</span>
            </div>
            <div>
              <span>보수</span>
              <span>100,000원</span>
            </div>
            <button>지원하기</button>
          </div>
        </aside>
      </div>
    </Container>
  );
}

export default HireDetail;
