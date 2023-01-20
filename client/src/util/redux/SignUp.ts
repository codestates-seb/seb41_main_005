// 액션 객체 타입
type SignUpActions =
  | { type: "SIGNUP_EMAIL"; payload: string }
  | { type: "SIGNUP_NICKNAME"; payload: string }
  | { type: "SIGNUP_PASSWORD"; payload: string }
  | { type: "SIGNUP_PASSWORDCONFIRM"; payload: string }
  | { type: "SIGNUP_INTRODUCTION"; payload: string }
  | { type: "SIGNUP_IMAGE"; payload: File | string | Blob };

// 상태 타입
type SignUpState = {
  signUpEmail: string;
  signUpNickname: string;
  signUpPassword: string;
  signUpPasswordConfirm: string;
  signUpIntroduction: string;
  signUpImg: File | string | Blob;
};

// 초기값
const initialState: SignUpState = {
  signUpEmail: "",
  signUpNickname: "",
  signUpPassword: "",
  signUpPasswordConfirm: "",
  signUpIntroduction: "",
  signUpImg: "",
};

//액션 생성 함수 선언
export const setEmail = (email: string) => ({
  type: "SIGNUP_EMAIL",
  payload: email,
});

export const setNickname = (nickname: string) => ({
  type: "SIGNUP_NICKNAME",
  payload: nickname,
});

export const setPassword = (password: string) => ({
  type: "SIGNUP_PASSWORD",
  payload: password,
});

export const setPasswordConfirm = (passwordconfirm: string) => ({
  type: "SIGNUP_PASSWORDCONFIRM",
  payload: passwordconfirm,
});

export const setIntroduction = (introduction: string) => ({
  type: "SIGNUP_INTRODUCTION",
  payload: introduction,
});

export const setImage = (files: File | string | Blob) => ({
  type: "SIGNUP_IMAGE",
  payload: files,
});

// 리듀서
export const SignUp = (
  state = initialState,
  action: SignUpActions
): SignUpState => {
  switch (action.type) {
    case "SIGNUP_EMAIL":
      return { ...state, signUpEmail: action.payload };
    case "SIGNUP_NICKNAME":
      return { ...state, signUpNickname: action.payload };
    case "SIGNUP_PASSWORD":
      return { ...state, signUpPassword: action.payload };
    case "SIGNUP_PASSWORDCONFIRM":
      return { ...state, signUpPasswordConfirm: action.payload };
    case "SIGNUP_INTRODUCTION":
      return { ...state, signUpIntroduction: action.payload };
    case "SIGNUP_IMAGE":
      return { ...state, signUpImg: action.payload };
    default:
      return state;
  }
};
