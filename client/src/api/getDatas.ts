import axios from "axios";

export const getDatas = async (contentType: string) => {
  try {
    const response = await axios.get(
      `https://ec2-43-201-27-162.ap-northeast-2.compute.amazonaws.com:8080/contents`,
      {
        params: {
          contentType: contentType,
        },
      }
    );
    console.log(response.data.data);
    return response.data.data;
  } catch (err) {
    console.log("Error: ", err);
  }
};
