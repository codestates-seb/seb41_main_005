import axios from "axios";
import { BASE_URL } from "./getUrl";

export const getMemberData = async (memberId: number | undefined) => {
  try {
    const response = await axios.get(`${BASE_URL}members/${memberId}`);
    return response.data;
  } catch (err) {
    console.log("Error: ", err);
  }
};
