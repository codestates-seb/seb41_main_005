import axios from "axios";

export const getReview = async (contentId: number) => {
  try {
    const response = await axios.get(
      `https://api.gigker.shop:443/reviews/contents/${contentId}?page=1`
    );
    return response.data;
  } catch (err) {
    console.log("Error: ", err);
  }
};
