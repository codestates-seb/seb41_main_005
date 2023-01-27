export interface sliderProps {
  categoryName: string;
  contentType: string;
  contentId: number;
  memberId: number;
  nickName: string;
  workTime: string[];
  price: number;
  title: string;
}

export interface serverData {
  title: string;
  nickName: string;
  price: number;
  workTimes: any[];
  memberId: number;
  categoryName: string;
  tag: string;
  contentId: number;
  contentType: string;
}
