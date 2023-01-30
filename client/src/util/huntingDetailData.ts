export interface huntingDetailProps {
  contentId: number;
  memberId: number;
  contentType: string;
  cityName: string;
  recruitingCount: number;
  contentTags: Array<{
    tagName: string;
  }>;
  nickName: string;
  workTime: string[];
  price: string;
  status: string;
  title: string;
  workContent: string;
  other: string;
  likeCount: number;
  dislikeCount: number;
  reviewCount: number;
  pictureUrl: string;
}
