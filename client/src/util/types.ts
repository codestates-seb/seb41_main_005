export type ApplicationState = {
  selectedCategory: string;
  selectedLocation: string;
  selectedTag: string;
  signUpEmail: string;
  signUpNickname: string;
  signUpPassword: string;
  signUpPasswordConfirm: string;
  signUpIntroduction: string;
  signUpImg: File | string | Blob | null;
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
  token: string;
};

export type ApplicationActions =
  | { type: "SELECT_CATEGORY"; payload: string }
  | { type: "SELECT_LOCATION"; payload: string }
  | { type: "SELECT_TAG"; payload: string }
  | { type: "SIGNUP_EMAIL"; payload: string }
  | { type: "SIGNUP_NICKNAME"; payload: string }
  | { type: "SIGNUP_PASSWORD"; payload: string }
  | { type: "SIGNUP_PASSWORDCONFIRM"; payload: string }
  | { type: "SIGNUP_INTRODUCTION"; payload: string }
  | { type: "SIGNUP_IMAGE"; payload: File | string | Blob | null }
  | { type: "LOGIN_EMAIL"; payload: string }
  | { type: "LOGIN_PASSWORD"; payload: string }
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
  | { type: "IS_UPLOAD"; payload: boolean }
  | { type: "IS_EMAIL"; payload: boolean }
  | { type: "TOKEN"; payload: string };

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

export const setLogInEmail = (email: string) => ({
  type: "LOGIN_EMAIL",
  payload: email,
});

export const setLogInPassword = (password: string) => ({
  type: "LOGIN_PASSWORD",
  payload: password,
});

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

export const setToken = (token: any) => ({
  type: "TOKEN",
  payload: token,
});
