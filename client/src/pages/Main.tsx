import { useEffect, useState } from "react";
import styled from "styled-components";
import MainSlider from "../components/main/MainSlider";
import { getDatas } from "../api/getDatas";
import { sliderProps, serverData } from "../util/sliderData";
import { transDateTime } from "../util/transDateTime";
import richIMG from "../assets/richIMG.jpg";

const Container = styled.div`
  display: block;
  max-width: 1060px;
  height: auto;
  margin: auto;
  padding-top: 70px;
  padding-bottom: 70px;
  .section {
    justify-content: center;
    align-items: center;
  }
`;

const StyledArticle = styled.article`
  display: block;
  position: relative;
  padding-top: 20px;
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
    background-size: 650px 360px;
    background-image: url(${richIMG});
    background-repeat: no-repeat;
  }
`;

const mapDataToSliderProps = (data: serverData): sliderProps => {
  return {
    categoryName: data.categoryName,
    contentType: data.contentType,
    title: data.title,
    nickName: data.nickName,
    price: data.price,
    workTime: transDateTime(data.workTimes),
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
      setHireData(
        data
          .slice(-8)
          .map(mapDataToSliderProps)
          .sort((a: sliderProps, b: sliderProps): number => {
            return b.contentId - a.contentId;
          })
      );
    };

    const hunting = async () => {
      const data = await getDatas("SELL");
      setHuntingData(
        data
          .slice(-8)
          .map(mapDataToSliderProps)
          .sort((a: sliderProps, b: sliderProps): number => {
            return b.contentId - a.contentId;
          })
      );
    };

    hire();
    hunting();
    setHireData(hireData.sort());
  }, []);

  return (
    <>
      <Container>
        <section>
          <StyledArticle>
            <div className="about bg">
              <div>
                <h2>N?????? ??????, ????????? ??? ?????????????</h2>
                <p>g!gker?????? ????????? ?????? ???????????????.</p>
              </div>
              <div>
                <h2>????????? ????????? ???????????????????</h2>
                <p>g!gker?????? ????????? ????????? ?????? ?????????!</p>
              </div>
            </div>
          </StyledArticle>
          <StyledArticle>
            <header>
              <div>
                <p>??????</p>
              </div>
            </header>
            <div className="slider">
              {hireData ? <MainSlider datas={hireData} /> : null}
            </div>
          </StyledArticle>
          <StyledArticle>
            <header>
              <div>
                <p>??????</p>
              </div>
            </header>
            <div className="slider">
              {huntingData ? <MainSlider datas={huntingData} /> : null}
            </div>
          </StyledArticle>
        </section>
      </Container>
    </>
  );
}

export default Main;
