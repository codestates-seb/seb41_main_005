import axios from "axios";

export const getReview = async (contentId: number) => {
  try {
    const response = await axios.get(
      `http://ec2-43-201-27-162.ap-northeast-2.compute.amazonaws.com:8080/reviews/content/${contentId}?page=1`
    );
    console.log(response.data);
    return response.data.data;
  } catch (err) {
    console.log("Error: ", err);
  }
};
