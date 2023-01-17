import { ApplicationState, ApplicationActions } from "./types";

const initialState: ApplicationState = {
  selectedCategory: "카테고리",
  selectedLocation: "지역",
  selectedTag: "",
  signUpEmail: "",
  signUpNickname: "",
  signUpPassword: "",
  signUpIntroduction: "",
  signUpImg: null,
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
    case "SIGNUP_INTRODUCTION":
      return { ...state, signUpIntroduction: action.payload };
    case "SIGNUP_IMAGE":
      return { ...state, signUpImg: action.payload };
    default:
      return state;
  }
};
