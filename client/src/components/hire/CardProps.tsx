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
}
export interface ServerData {
  price: number;
  nickName: string;
  title: string;
  workTimes: any;
  category: string | null;
  location: string | null;
  memberId: number;
  data: {
    contentId: number;
    title: string;
    price: number;
    workTimes: {
      startWorkTime: string | null;
      endWorkTime: string | null;
    };
    memberId: number;
    nickName: string;
  }[];
}
