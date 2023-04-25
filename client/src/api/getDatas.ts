import axios from "axios";

export const getDatas = async (contentType: string) => {
  try {
    const response = await axios.get(
      `https://api.gigker.shop:443/contents`,
      {
        params: {
          contentType: contentType,
        },
      }
    );
    return response.data.data;
  } catch (err) {
    console.log("Error: ", err);
  }
};
