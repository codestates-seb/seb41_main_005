import { useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import MainSlider from "../components/main/MainSlider";
import { getDatas } from "../api/getDatas";
import { hireProps } from "../util/hireData";
import { huntingProps } from "../util/huntingData";

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

function Main() {
  const [hireData, setHireData] = useState<hireProps>();
  const [huntingData, setHuntingData] = useState<huntingProps>();

  useEffect(() => {
    const hireData = async () => {
      const data = await getDatas("BUY");
      setHireData(data);
    };

    const huntingData = async () => {
      const data = await getDatas("SELL");
      setHuntingData(data);
    };

    hireData();
    huntingData();
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
            <MainSlider />
          </div>
        </StyledArticle>
        <StyledArticle>
          <header>
            <div>
              <p>구직</p>
            </div>
          </header>
          <div className="slider">
            <MainSlider />
          </div>
        </StyledArticle>
      </section>
      <Footer />
    </Container>
  );
}

export default Main;
