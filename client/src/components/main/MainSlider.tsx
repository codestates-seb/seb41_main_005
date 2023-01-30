import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

import styled from "styled-components";
import SliderItem from "./SliderItem";
import { sliderProps } from "../../util/sliderData";

const StyledSlider = styled.div`
  display: flex;
  justify-content: center;
  align-times: center;

  .button {
    width: 28px;
    height: 28px;
  }
  .swiper-slide {
    padding: 0px 28px 0px 28px;
  }
  .swiper-button-next {
    border: none;
    background-color: transparent;
  }
  .swiper-button-prev {
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
        spaceBetween={0}
        effect={"fade"}
        loop={false}
        speed={300}
      >
        <button className="swiper-button-prev">
          <img className="button" src={"/assets/ic_prev.png"} alt="" />
        </button>
        {datas.map((item, idx) => {
          return (
            <SwiperSlide key={idx} className="swiper-slide">
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
