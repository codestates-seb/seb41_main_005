import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { images } from "../../assets/sliderImages";

const matchImage = (
  categoryName: string,
  images: Array<{ category: string; src: string }>
) => images.filter((el) => el.category === categoryName).map((el) => el.src)[0];

const SliderItem = ({
  contentType,
  contentId,
  title,
  nickName,
  price,
  workTime,
  categoryName,
}: {
  contentType: string;
  contentId: number;
  title: string;
  nickName: string;
  price: number;
  workTime: string[];
  categoryName: string;
}) => {
  const navigate = useNavigate();
  const num = matchImage(categoryName, images);

  const handleClick = () => {
    contentType === "BUY"
      ? navigate(`/hireDetail/${contentId}`)
      : navigate(`/huntingDetail/${contentId}`);
  };

  return (
    <SliderItemContainer onClick={handleClick}>
      <SliderImageWrapper>
        {categoryName === null ? (
          <img
            className="slider-image"
            src={`/assets/sliderIMG/00.jpg`}
            alt="SliderImg"
          />
        ) : (
          <img
            className="slider-image"
            src={`/assets/sliderIMG/${num}.jpg`}
            alt="SliderImg"
          />
        )}
      </SliderImageWrapper>
      <SliderItemContent>
        <Title>{title}</Title>
        <Content>
          <div>
            <span className="sub-title">작성자</span>
            <span>{nickName}</span>
          </div>
          <div>
            <span className="sub-title">보수</span>
            <span>
              {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
            </span>
          </div>
          <div>
            <span className="sub-title">업무 시간</span>
            {workTime
              ? workTime.map((work, idx) => <span key={idx}>{work}</span>)
              : null}
          </div>
        </Content>
      </SliderItemContent>
    </SliderItemContainer>
  );
};

export default SliderItem;

const SliderItemContainer = styled.div`
  margin: 10px 10px 20px 0px;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: grab;
`;

const SliderItemContent = styled.div`
  padding: 0px 0px 40px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: 0.4s;
`;

const SliderImageWrapper = styled.div`
  padding-top: 10px;
  height: 160px;
  width: 100%;
  overflow: hidden;

  > img {
    width: 100%;
    height: 100%;
    border-radius: 5px;

    /* cover : 대체 콘텐츠의 가로세로비 유지 & 요소 콘텐츠박스를 가득 채움 */
    object-fit: cover;
    transition: 0.2s;
  }
`;

const Title = styled.h2`
  margin: 0;
  font-weight: bold;
  font-size: 18px;
  line-height: 20px;
  color: #26384e;
  transform: translateY(20px);
  transition: all 0.4s ease;
  transition-delay: 0.2s;
  overflow: hidden;
  max-width: 100%;
  /* ellipsis '...' */
  text-overflow: ellipsis;
  /* 공백처리 방법. nowrap은 줄바꿈은 1개의 공백으로 바꾸고, 자동 줄바꿈은 지원하지 않음 */
  white-space: nowrap;

  /* 가로 520px까지 작게 */
  @media screen and (max-width: 520px) {
    & {
      font-size: 16px;
      line-height: 24px;
    }
  }
`;

const Content = styled.div`
  font-size: 16px;
  line-height: 18px;
  transform: translateY(20px);
  transition: all 0.4s ease;
  transition-delay: 0.3s;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  div {
    margin: 10px 0px 0px 0px;
    span {
      padding-right: 10px;
    }
    .sub-title {
      color: #6667ab;
    }
  }

  @media screen and (max-width: 520px) {
    & {
      font-size: 14px;
      line-height: 20px;
    }
  }
`;
