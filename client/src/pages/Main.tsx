import styled from "styled-components";
import axios from "axios";
import Footer from "../components/Footer";
import MainSlider from "../components/main/MainSlider";

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
