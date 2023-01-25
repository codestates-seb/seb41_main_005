export interface sliderProps {
  contentId: number;
  memberId: number;
  nickName: string;
  workTime: string[];
  location: string;
  price: number;
  title: string;
}

export interface serverData {
  title: string;
  nickName: string;
  price: number;
  workTimes: any[];
  memberId: number;
  location: string;
  category: string | null;
  tag: string;
  contentId: number;
}
