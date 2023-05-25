import axios from "axios";
import { BASE_URL } from "./getUrl";

export const getReview = async (contentId: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}reviews/contents/${contentId}?page=1`
    );
    return response.data;
  } catch (err) {
    console.log("Error: ", err);
  }
};
