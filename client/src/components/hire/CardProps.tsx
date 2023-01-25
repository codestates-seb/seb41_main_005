//카드 컴포넌트 데이터 모양
export interface CardProps {
  title: string;
  nickName: string;
  price: number;
  workTimes: {
    startWorkTime: string | null;
    endWorkTime: string | null;
  };
  memberId: number;
  location: string | null;
  categories: string | null;
  tag: string;
  contentId: number;
}

//서버에서 오는 데이터의 모양
export interface ServerData {
  title: string;
  nickName: string;
  price: number;
  workTimes: {
    startWorkTime: string | null;
    endWorkTime: string | null;
  };
  memberId: number;
  location: string | null;
  category: string | null;
  tag: string;
  contentId: number;
}
