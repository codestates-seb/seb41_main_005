import axios from "axios";
import { setCookie, getCookie, removeCookie } from "./cookie";

// 토큰 재발급 함수
export const handleRefresh = async () => {
  const AUTH_TOKEN = localStorage.getItem("Authorization");
  const REFRESH_TOKEN = getCookie("refresh");
  axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
  axios.defaults.headers.common["Refresh"] = REFRESH_TOKEN;
  if (AUTH_TOKEN) {
    axios
      .get(
        "http://ec2-3-39-239-42.ap-northeast-2.compute.amazonaws.com:8080/auth/refresh"
      )
      .then((res) => {
        onLogInSuccess(res);
        console.log("리프레쉬");
      })
      .catch((err) => {
        if (localStorage.getItem("Authorization")) {
          console.log(err);
          localStorage.clear();
          removeCookie("refresh");
          alert("토큰 만료로 인해 자동로그아웃됩니다. \n다시 로그인 해주세요.");
          location.reload();
        }
      });
  }
};

// 로그인 성공시 실행 함수
export const onLogInSuccess = (res: any) => {
  const ACCESS_EXPIRY_TIME = 10 * 60 * 1000;
  const REFRESH_EXPIRY_TIME = 24 * 3600;

  const AUTH_TOKEN = res.headers.authorization;
  const REFRESH_TOKEN = res.headers.refresh;
  if (AUTH_TOKEN) {
    window.localStorage.setItem("Authorization", AUTH_TOKEN);
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
  }
  if (REFRESH_TOKEN !== undefined) {
    setCookie("refresh", REFRESH_TOKEN, { maxAge: REFRESH_EXPIRY_TIME });
    axios.defaults.headers.common["Refresh"] = REFRESH_TOKEN;
  }
  setTimeout(handleRefresh, ACCESS_EXPIRY_TIME - 30000);
};
