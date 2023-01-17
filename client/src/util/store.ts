import { createStore } from "redux";
import { reducer } from "./reducer";

export interface RootState {
  selectedCategory: string;
  selectedLocation: string;
  selectedTag: string;
  signUpEmail: string;
  signUpNickname: string;
  signUpPassword: string;
  signUpIntroduction: string;
  signUpImg: File | string | Blob;
}

export const store = createStore(reducer);
