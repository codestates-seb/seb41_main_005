import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwipeCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import SliderItem from "./SliderItem";
import prev from "../../assets/icon_prev_round.svg";
import next from "../../assets/icon_next_round.svg";
import { sliderProps } from "../../util/sliderData";

const MainSlider = ({ datas }: { datas: sliderProps[] }) => {
  SwipeCore.use([Navigation, Pagination, Autoplay]);

  // const prevRef = useRef(null);
  // const nextRef = useRef(null);

  // const [swiperSetting, setSwiperSetting] = useState(null);

  // useEffect(() => {
  //   if (!swiperSetting) {
  //     const settings = {
  //       // autoplay: { delay: 1000 },
  //       navigation: {
  //         prevEl: prevRef.current, // 이전 버튼
  //         nextEl: nextRef.current // 다음 버튼
  //       },
  //       onBeforeInit: (swiper) => {
  //         // 초기 설정
  //         swiper.params.navigation.prevEl = prevRef.current;
  //         swiper.params.navigation.nextEl = nextRef.current;
  //         swiper.navigation.update();
  //       },
  //       pagination: {
  //         el: ".swiper-pagination",
  //         clickable: true,
  //         dynamicBullets: true
  //       }
  //     };

  //     setSwiperSetting(settings);
  //   }
  // }, [prevRef, nextRef, swiperSetting]);

  return (
    <>
      {/* {swiperSetting && ( */}
      <Swiper
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        // navigation={{
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev",
        // }}
        navigation
        slidesPerView={4}
        spaceBetween={20}
        effect={"fade"}
        loop={false}
        speed={300}
        className="swiper-container"
      >
        <div className="swiper-wrapper">
          {datas.map((item, idx) => {
            return (
              <SwiperSlide key={idx}>
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
          <div className="slider-buttons">
            <button className="swiper-button-prev">
              <img src={prev} alt="" />
            </button>
            <button className="swiper-button-next">
              <img src={next} alt="" />
            </button>
          </div>
          {/* <div className="swiper-pagination" /> */}
        </div>
      </Swiper>
      {/* )} */}
    </>
  );
};

export default MainSlider;
