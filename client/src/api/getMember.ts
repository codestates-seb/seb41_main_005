import axios from "axios";

export const getMemberData = async (memberId: number | undefined) => {
  try {
    const response = await axios.get(
      `https://api.gigker.shop:443/members/${memberId}`
    );
    return response.data;
  } catch (err) {
    console.log("Error: ", err);
  }
};
