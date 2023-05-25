import axios from "axios";
import { BASE_URL } from "./getUrl";

export const getDetailData = async (contentId: number | undefined) => {
  try {
    const response = await axios.get(`${BASE_URL}/contents/${contentId}`);
    return response.data.data;
  } catch (err) {
    console.log("Error: ", err);
  }
};
