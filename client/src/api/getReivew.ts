import axios from "axios";

export const getReview = async (contentId: number) => {
  try {
    const response = await axios.get(
      `http://ec2-54-180-116-246.ap-northeast-2.compute.amazonaws.com:8080/reviews/contents/${contentId}?page=1`
    );
    return response.data;
  } catch (err) {
    console.log("Error: ", err);
  }
};
