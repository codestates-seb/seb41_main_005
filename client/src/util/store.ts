import { createStore } from "redux";
import { reducer } from "./reducer";

export interface RootState {
  selectedCategory: string;
  selectedLocation: string;
  selectedTag: string;
  signUpEmail: string;
  signUpNickname: string;
  signUpPassword: string;
  signUpPasswordConfirm: string;
  signUpIntroduction: string;
  signUpImg: File | string | Blob;
  logInEmail: string;
  logInPassword: string;
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
  token: any;
}

export const store = createStore(reducer);
