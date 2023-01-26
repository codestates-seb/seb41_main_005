export interface hireDetailProps {
  contentId: number;
  memberId: number;
  contentType: string;
  title: string;
  nickName: string;
  cityName: string;
  contentTags: any[];
  price: number;
  workTime: string[];
  location: string;
  categoryName: string;
  workContent: string;
  recruitingCount: number;
  other: string;
  preference: string;
  qualification: string;
  status: string;
}

export interface serverData {
  contentId: number;
  memberId: number;
  contentType: string;
  title: string;
  nickName: string;
  cityName: string;
  contentTags: any[];
  price: number;
  workTimes: any[];
  location: string;
  categoryName: string;
  workContent: string;
  recruitingCount: number;
  other: string;
  preference: string;
  qualification: string;
  status: string;
}
