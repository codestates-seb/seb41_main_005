import axios from "axios";

export const getDatas = async (contentType: string) => {
  try {
    const response = await axios.get(
      `http://ec2-3-39-239-42.ap-northeast-2.compute.amazonaws.com:8080/contents`,
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
