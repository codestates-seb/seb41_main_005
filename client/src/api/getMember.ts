import axios from "axios";

export const getMemberData = async (memberId: number | undefined) => {
  try {
    const response = await axios.get(
      `http://ec2-3-39-239-42.ap-northeast-2.compute.amazonaws.com:8080/members/${memberId}`
    );
    return response.data;
  } catch (err) {
    console.log("Error: ", err);
  }
};
