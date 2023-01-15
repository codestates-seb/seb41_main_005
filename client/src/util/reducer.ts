import { ApplicationState, ApplicationActions } from "./types";

const initialState: ApplicationState = {
  selectedCategory: "카테고리",
  selectedLocation: "지역",
  selectedTag: "",
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
    default:
      return state;
  }
};
