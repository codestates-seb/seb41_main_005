// 액션 객체 타입
type DropDownActions =
  | { type: "SELECT_CATEGORY"; payload: string }
  | { type: "SELECT_LOCATION"; payload: string }
  | { type: "SELECT_TAG"; payload: string }
  | { type: "RESET_CATEGORY" }
  | { type: "RESET_LOCATION" }
  | { type: "RESET_TAG" };
// 상태 타입
type DropDownState = {
  selectedCategory: string;
  selectedLocation: string;
  selectedTag: string;
};

// 초기값
const initialState: DropDownState = {
  selectedCategory: "카테고리",
  selectedLocation: "지역",
  selectedTag: "",
};

//액션 생성 함수 선언
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

export const resetCategory = () => ({
  type: "RESET_CATEGORY",
});

export const resetLocation = () => ({
  type: "RESET_LOCATION",
});

export const resetTag = () => ({
  type: "RESET_TAG",
});

// 리듀서
export const DropDown = (
  state = initialState,
  action: DropDownActions
): DropDownState => {
  switch (action.type) {
    case "SELECT_CATEGORY":
      return { ...state, selectedCategory: action.payload };
    case "SELECT_LOCATION":
      return { ...state, selectedLocation: action.payload };
    case "SELECT_TAG":
      return { ...state, selectedTag: action.payload };
    case "RESET_CATEGORY":
      return { ...state, selectedCategory: "카테고리" };
    case "RESET_LOCATION":
      return { ...state, selectedLocation: "지역" };
    case "RESET_TAG":
      return { ...state, selectedTag: "" };
    default:
      return state;
  }
};
