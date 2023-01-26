import { useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import MainSlider from "../components/main/MainSlider";
import { getDatas } from "../api/getDatas";
import { sliderProps, serverData } from "../util/sliderData";
import { transDateTime } from "../components/main/transDateTime";
import richIMG from "../assets/richIMG.jpg";

const Container = styled.div`
  display: block;
  max-width: 1060px;
  padding-top: 70px;
  .section {
    justify-content: center;
    align-items: center;
  }
`;

const StyledArticle = styled.article`
  border-bottom: solid 1px #a5a5a5;
  display: block;
  position: relative;
  background-image: none;
  header {
    margin-top: 30px;
    font-size: 24px;
    font-weight: bold;
  }
  .about {
    height: 300px;
    margin: 40px 20px 0px 0px;
    padding: 10px;
    text-align: right;
    line-height: 30px;
    div {
      text-shadow: 2px 2px 2px white;
      h2 {
        margin-top: 10px;
        font-size: 28px;
        font-weight: medium;
      }
      p {
        margin-bottom: 48px;
        font-size: 20px;
        font-weight: demilight;
      }
    }
  }
  .bg {
    background-size: 680px 360px;
    background-image: url(${richIMG});
    background-repeat: no-repeat;
  }
`;

const mapDataToSliderProps = (data: serverData): sliderProps => {
  return {
    contentType: data.contentType,
    title: data.title,
    nickName: data.nickName,
    price: data.price,
    workTime: transDateTime(data.workTimes),
    location: data.location,
    memberId: data.memberId,
    contentId: data.contentId,
  };
};

function Main() {
  const [hireData, setHireData] = useState<sliderProps[]>([]);
  const [huntingData, setHuntingData] = useState<sliderProps[]>([]);

  useEffect(() => {
    const hire = async () => {
      const data = await getDatas("BUY");
      setHireData(data.map(mapDataToSliderProps));
    };

    const hunting = async () => {
      const data = await getDatas("SELL");
      setHuntingData(data.map(mapDataToSliderProps));
    };

    hire();
    hunting();
  }, []);

  return (
    <Container>
      <section>
        <StyledArticle>
          <div className="about bg">
            <div>
              <h2>N잡의 시대, 주말에 돈 벌어볼까?</h2>
              <p>g!gker에서 원하는 일을 찾아보세요.</p>
            </div>
            <div>
              <h2>급하게 일손이 필요하시다면?</h2>
              <p>g!gker에서 구인도 구직도 쉽고 빠르게!</p>
            </div>
          </div>
        </StyledArticle>
        <StyledArticle>
          <header>
            <div>
              <p>구인</p>
            </div>
          </header>
          <div className="slider">
            {hireData ? <MainSlider datas={hireData} /> : null}
          </div>
        </StyledArticle>
        <StyledArticle>
          <header>
            <div>
              <p>구직</p>
            </div>
          </header>
          <div className="slider">
            {huntingData ? <MainSlider datas={huntingData} /> : null}
          </div>
        </StyledArticle>
      </section>
      <Footer />
    </Container>
  );
}

export default Main;
