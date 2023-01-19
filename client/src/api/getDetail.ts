import axios from "axios";

export const getDetailData = async (contentId: number | undefined) => {
  try {
    const response = await axios.get(
      `http://gigker.iptime.org:8080/contents/${contentId}`
    );
    console.log(response.data.data);
    return response.data.data;
  } catch (err) {
    console.log("Error: ", err);
  }
};
