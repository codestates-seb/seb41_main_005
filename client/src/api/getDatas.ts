import axios from "axios";
import { BASE_URL } from "./getUrl";

export const getDatas = async (contentType: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/contents`, {
      params: {
        contentType: contentType,
      },
    });
    return response.data.data;
  } catch (err) {
    console.log("Error: ", err);
  }
};
