export type ApplicationState = {
  selectedCategory: string;
  selectedLocation: string;
  selectedTag: string;
  signUpEmail: string;
  signUpNickname: string;
  signUpPassword: string;
  signUpIntroduction: string;
  signUpImg: File | string | Blob | null;
};

export type ApplicationActions =
  | { type: "SELECT_CATEGORY"; payload: string }
  | { type: "SELECT_LOCATION"; payload: string }
  | { type: "SELECT_TAG"; payload: string }
  | { type: "SIGNUP_EMAIL"; payload: string }
  | { type: "SIGNUP_NICKNAME"; payload: string }
  | { type: "SIGNUP_PASSWORD"; payload: string }
  | { type: "SIGNUP_INTRODUCTION"; payload: string }
  | { type: "SIGNUP_IMAGE"; payload: File | string | Blob | null };

export const selectCategory = (category: string) => ({
  type: "SELECT_CATEGORY",
  payload: category,
});

export const selectLocation = (location: string) => ({
  type: "SELECT_LOCATION",
  payload: location,
});

export const selectTag = (tag: string) => ({
  type: "SELECT_TAG",
  payload: tag,
});

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

export const setIntroduction = (introduction: string) => ({
  type: "SIGNUP_INTRODUCTION",
  payload: introduction,
});

export const setImage = (files: File | string | Blob) => ({
  type: "SIGNUP_IMAGE",
  payload: files,
});
