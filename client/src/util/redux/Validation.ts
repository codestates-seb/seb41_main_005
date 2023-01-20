// 액션 객체 타입
type ValidationActions =
  | { type: "EMAIL_MESSAGE"; payload: string }
  | { type: "IS_EMAIL"; payload: boolean }
  | { type: "NICKNAME_MESSAGE"; payload: string }
  | { type: "IS_NICKNAME"; payload: boolean }
  | { type: "PASSWORD_MESSAGE"; payload: string }
  | { type: "IS_PASSWORD"; payload: boolean }
  | { type: "PASSWORDCONFIRM_MESSAGE"; payload: string }
  | { type: "IS_PASSWORDCONFIRM"; payload: boolean }
  | { type: "INTRODUCTION_MESSAGE"; payload: string }
  | { type: "IS_INTRODUCTION"; payload: boolean }
  | { type: "IS_UPLOAD"; payload: boolean };

// 상태 타입
type ValidationState = {
  emailMessage: string;
  isEmail: boolean;
  nickNameMessage: string;
  isNickName: boolean;
  passwordMessage: string;
  isPassword: boolean;
  passwordConfirmMessage: string;
  isPasswordConfirm: boolean;
  introductionMessage: string;
  isIntroduction: boolean;
  isUpload: boolean;
};

// 초기값
const initialState: ValidationState = {
  emailMessage: "",
  isEmail: false,
  nickNameMessage: "",
  isNickName: false,
  passwordMessage: "",
  isPassword: false,
  passwordConfirmMessage: "",
  isPasswordConfirm: false,
  introductionMessage: "",
  isIntroduction: false,
  isUpload: false,
};

//액션 생성 함수 선언
export const setEmailMessage = (message: string) => ({
  type: "EMAIL_MESSAGE",
  payload: message,
});

export const setIsEmail = (isEmail: boolean) => ({
  type: "IS_EMAIL",
  payload: isEmail,
});

export const setNickNameMessage = (message: string) => ({
  type: "NICKNAME_MESSAGE",
  payload: message,
});

export const setIsNickName = (isNickName: boolean) => ({
  type: "IS_NICKNAME",
  payload: isNickName,
});

export const setPasswordMessage = (message: string) => ({
  type: "PASSWORD_MESSAGE",
  payload: message,
});

export const setIsPassword = (isPassword: boolean) => ({
  type: "IS_PASSWORD",
  payload: isPassword,
});

export const setPasswordConfirmMessage = (message: string) => ({
  type: "PASSWORDCONFIRM_MESSAGE",
  payload: message,
});

export const setIsPasswordConfirm = (isPasswordConfirm: boolean) => ({
  type: "IS_PASSWORDCONFIRM",
  payload: isPasswordConfirm,
});

export const setIntroductionMessage = (message: string) => ({
  type: "INTRODUCTION_MESSAGE",
  payload: message,
});

export const setIsIntroduction = (isIntroduction: boolean) => ({
  type: "IS_INTRODUCTION",
  payload: isIntroduction,
});

export const setIsUpload = (isUpload: boolean) => ({
  type: "IS_UPLOAD",
  payload: isUpload,
});

// 리듀서
export const Validation = (
  state = initialState,
  action: ValidationActions
): ValidationState => {
  switch (action.type) {
    case "EMAIL_MESSAGE":
      return { ...state, emailMessage: action.payload };
    case "IS_EMAIL":
      return { ...state, isEmail: action.payload };
    case "NICKNAME_MESSAGE":
      return { ...state, nickNameMessage: action.payload };
    case "IS_NICKNAME":
      return { ...state, isNickName: action.payload };
    case "PASSWORD_MESSAGE":
      return { ...state, passwordMessage: action.payload };
    case "IS_PASSWORD":
      return { ...state, isPassword: action.payload };
    case "PASSWORDCONFIRM_MESSAGE":
      return { ...state, passwordConfirmMessage: action.payload };
    case "IS_PASSWORDCONFIRM":
      return { ...state, isPasswordConfirm: action.payload };
    case "INTRODUCTION_MESSAGE":
      return { ...state, introductionMessage: action.payload };
    case "IS_INTRODUCTION":
      return { ...state, isIntroduction: action.payload };
    case "IS_UPLOAD":
      return { ...state, isUpload: action.payload };
    default:
      return state;
  }
};
