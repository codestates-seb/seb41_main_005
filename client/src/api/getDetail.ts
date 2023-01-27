import axios from "axios";

export const getDetailData = async (contentId: number | undefined) => {
  try {
    const response = await axios.get(
      `http://ec2-43-201-27-162.ap-northeast-2.compute.amazonaws.com:8080/contents/${contentId}`
    );
    return response.data.data;
  } catch (err) {
    console.log("Error: ", err);
  }
};
