import { Swiper, SwiperSlide } from "swiper/react";
import SwipeCore, { Navigation, Pagination, Autoplay } from "swiper";
import { useState, useRef, useEffect } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import SliderItem from "./SliderItem";
import prev from "../../assets/icon_prev_round.svg";
import next from "../../assets/icon_next_round.svg";
import { sliderProps } from "../../util/sliderData";

const items = [
  {
    title: "강아지 산책 시켜주실 분 구해요",
    nickName: "동그리",
    src: "https://images.unsplash.com/photo-1498307833015-e7b400441eb8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2600&q=80",
  },
  {
    title: "출장 세차 해드립니다",
    nickName: "산타",
    src: "https://images.unsplash.com/photo-1491900177661-4e1cd2d7cce2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80",
  },
  {
    title: "단순 포장 업무 하실 분 구해요",
    nickName: "와니",
    src: "https://images.unsplash.com/photo-1482192505345-5655af888cc4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2600&q=80",
  },
  {
    title: "대신 장 봐 드립니다",
    nickName: "슬기로운생활",
    src: "https://images.unsplash.com/photo-1564604761388-83eafc96f668?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=801.2.1&auto=format&fit=crop&w=2167&q=80",
  },
];

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
                  contentId={item.contentId}
                  title={item.title}
                  nickName={item.nickName}
                  price={item.price}
                  workTime={item.workTime}
                  src={
                    "https://images.unsplash.com/photo-1498307833015-e7b400441eb8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2600&q=80"
                  }
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
