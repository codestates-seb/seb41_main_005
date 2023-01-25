import { useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import MainSlider from "../components/main/MainSlider";
import { getDatas } from "../api/getDatas";
import { sliderProps, serverData } from "../util/sliderData";
import { transDateTime } from "../components/main/transDateTime";

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
    padding: 10px;
  }
`;

const mapDataToSliderProps = (data: serverData): sliderProps => {
  return {
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
      setHireData(data);
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
          <header>소개</header>
          <div className="about">
            <p>어쩌구 소개 about gigker</p>
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
