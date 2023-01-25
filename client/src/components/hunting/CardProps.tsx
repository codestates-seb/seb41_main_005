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
