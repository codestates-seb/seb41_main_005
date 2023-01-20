// 액션 객체 타입
type LogInActions =
  | { type: "LOGIN_EMAIL"; payload: string }
  | { type: "LOGIN_PASSWORD"; payload: string }
  | { type: "IS_LOGIN"; payload: boolean }
  | { type: "IMG_URL"; payload: string };

// 상태 타입
type LogInState = {
  logInEmail: string;
  logInPassword: string;
  isLogIn: boolean;
  imgUrl: string;
};

// 초기값
const initialState: LogInState = {
  logInEmail: "",
  logInPassword: "",
  isLogIn: false,
  imgUrl: "",
};

//액션 생성 함수 선언
export const setLogInEmail = (email: string) => ({
  type: "LOGIN_EMAIL",
  payload: email,
});

export const setLogInPassword = (password: string) => ({
  type: "LOGIN_PASSWORD",
  payload: password,
});

export const setIsLogIn = (isLogIn: boolean) => ({
  type: "IS_LOGIN",
  payload: isLogIn,
});

export const setImgUrl = (url: string) => ({
  type: "IMG_URL",
  payload: url,
});

// 리듀서
export const LogIn = (
  state = initialState,
  action: LogInActions
): LogInState => {
  switch (action.type) {
    case "LOGIN_EMAIL":
      return { ...state, logInEmail: action.payload };
    case "LOGIN_PASSWORD":
      return { ...state, logInPassword: action.payload };
    case "IS_LOGIN":
      return { ...state, isLogIn: action.payload };
    case "IMG_URL":
      return { ...state, imgUrl: action.payload };
    default:
      return state;
  }
};