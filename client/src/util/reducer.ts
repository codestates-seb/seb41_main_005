import { ApplicationState, ApplicationActions } from "./types";

const initialState: ApplicationState = {
  selectedCategory: "카테고리",
  selectedLocation: "지역",
  selectedTag: "",
  signUpEmail: "",
  signUpNickname: "",
  signUpPassword: "",
  signUpPasswordConfirm: "",
  signUpIntroduction: "",
  signUpImg: null,
  logInEmail: "",
  logInPassword: "",
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
  isLogIn: false,
};

export const reducer = (
  state = initialState,
  action: ApplicationActions
): ApplicationState => {
  switch (action.type) {
    case "SELECT_CATEGORY":
      return { ...state, selectedCategory: action.payload };
    case "SELECT_LOCATION":
      return { ...state, selectedLocation: action.payload };
    case "SELECT_TAG":
      return { ...state, selectedTag: action.payload };
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
    case "LOGIN_EMAIL":
      return { ...state, logInEmail: action.payload };
    case "LOGIN_PASSWORD":
      return { ...state, logInPassword: action.payload };
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
    case "IS_LOGIN":
      return { ...state, isLogIn: action.payload };
    default:
      return state;
  }
};
