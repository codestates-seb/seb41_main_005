//카드 컴포넌트 데이터 모양
export interface CardProps {
  title: string;
  nickName: string;
  price: number;
  workTimes: Array<{
    startWorkTime: string;
    endWorkTime: string;
  }>;
  memberId: number;
  location: string;
  categories: string;
  tag: string;
  contentId: number;
  createdAt: string;
}

//서버에서 오는 데이터의 모양
export interface ServerData {
  title: string;
  nickName: string;
  price: number;
  workTimes: Array<{
    startWorkTime: string;
    endWorkTime: string;
  }>;
  memberId: number;
  cityName: string;
  categoryName: string;
  contentTags: Array<{
    tagName: string;
  }>;
  contentId: number;
  createdAt: string;
}
