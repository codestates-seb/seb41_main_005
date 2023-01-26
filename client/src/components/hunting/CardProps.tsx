export interface CardProps {
  title: string;
  nickName: string;
  price: number;
  workTimes: Array<{
    startWorkTime: string;
    endWorkTime: string;
  }>;
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
}
