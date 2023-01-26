import axios from "axios";

export const getMemberData = async (memberId: number | undefined) => {
  try {
    const response = await axios.get(
      `http://ec2-43-201-27-162.ap-northeast-2.compute.amazonaws.com:8080/members/${memberId}`
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log("Error: ", err);
  }
};
