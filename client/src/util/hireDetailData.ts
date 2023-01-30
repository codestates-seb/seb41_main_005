export interface hireDetailProps {
  contentId: number;
  memberId: number;
  contentType: string;
  title: string;
  nickName: string;
  cityName: string;
  contentTags: Array<{
    tagName: string;
  }>;
  price: number;
  workTime: string[];
  categoryName: string;
  workContent: string;
  recruitingCount: number;
  other: string;
  preference: string;
  qualification: string;
  status: string;
  likeCount: number;
  dislikeCount: number;
  reviewCount: number;
  pictureUrl: string;
}

export interface serverData {
  contentId: number;
  memberId: number;
  contentType: string;
  title: string;
  nickName: string;
  likeCount: number;
  dislikeCount: number;
  reviewCount: number;
  pictureUrl: string;
  cityName: string;
  contentTags: Array<{
    tagName: string;
  }>;
  price: number;
  workTimes: Array<{
    startWorkTime: string;
    endWorkTime: string;
  }>;
  categoryName: string;
  workContent: string;
  recruitingCount: number;
  other: string;
  preference: string;
  qualification: string;
  status: string;
}
