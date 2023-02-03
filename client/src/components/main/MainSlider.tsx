import styled from "styled-components";
import SliderItem from "./SliderItem";
import { sliderProps } from "../../util/sliderData";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const StyledSlider = styled.div`
  display: flex;
  justify-content: center;
  align-times: center;

  .button {
    width: 28px;
    height: 28px;
  }
  .swiper-container {
    padding: 20px 5px 0px 5px;
  }
  .swiper-button-next {
    transform: translate(0px, -160px);
    border: none;
    background-color: transparent;
  }
  .swiper-button-prev {
    transform: translate(975px, -160px);
    border: none;
    background-color: transparent;
  }
  .swiper-button-next::after,
  .swiper-button-prev::after {
    display: none;
  }
`;

const MainSlider = ({ datas }: { datas: sliderProps[] }) => {
  SwiperCore.use([Navigation]);

  return (
    <StyledSlider>
      <Swiper
        className="swiper-container"
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        slidesPerView={4}
        spaceBetween={25}
        effect={"fade"}
        loop={false}
        speed={300}
      >
        <button className="swiper-button-prev">
          <img className="button" src={"/assets/ic_prev.png"} alt="" />
        </button>
        {datas.map((item, idx) => {
          return (
            <SwiperSlide key={idx} className="swiper-slider">
              <SliderItem
                contentType={item.contentType}
                contentId={item.contentId}
                title={item.title}
                nickName={item.nickName}
                price={item.price}
                workTime={item.workTime}
                categoryName={item.categoryName}
              />
            </SwiperSlide>
          );
        })}
        <button className="swiper-button-next">
          <img className="button" src={"/assets/ic_next.png"} alt="" />
        </button>
      </Swiper>
    </StyledSlider>
  );
};

export default MainSlider;
