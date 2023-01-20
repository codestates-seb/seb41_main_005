import styled from "styled-components";
import axios from "axios";
import Footer from "../components/Footer";

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
  display: block;
  position: relative;
  background-image: none;
`;

function Main() {
  return (
    <Container>
      <section>
        <article>
          <header>
            <div>
              <p>구인</p>
            </div>
            <div>
              <button>왼버튼</button>
              <button>오버튼</button>
            </div>
          </header>
          <p>1</p>
        </article>
        <article>
          <header>구인</header>
          <p>2</p>
        </article>
        <StyledArticle>
          <header>구직</header>
          <p>3</p>
        </StyledArticle>
      </section>
      <Footer />
    </Container>
  );
}

export default Main;
