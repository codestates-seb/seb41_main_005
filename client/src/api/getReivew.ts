import axios from "axios";

export const getReview = async (contentId: number) => {
  try {
    const response = await axios.get(
      `http://ec2-3-39-239-42.ap-northeast-2.compute.amazonaws.com:8080/reviews/contents/${contentId}?page=1`
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log("Error: ", err);
  }
};
