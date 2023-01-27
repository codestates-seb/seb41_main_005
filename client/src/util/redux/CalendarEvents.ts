import { EventApi } from "@fullcalendar/core";
// 액션 객체 타입
type CalendarActions =
  | { type: "WEEKENDS_VISIBLE"; payload: boolean }
  | { type: "CURRENT_EVENTS"; payload: EventApi[] };

// 상태 타입
type CalendarState = {
  weekendsVisible: boolean;
  currentEvents: EventApi[];
};

// 초기값
const initialState: CalendarState = {
  weekendsVisible: true,
  currentEvents: [],
};

//액션 생성 함수 선언
export const setWeekendsVisible = (visible: boolean) => ({
  type: "WEEKENDS_VISIBLE",
  payload: visible,
});

export const setCurrentEvents = (event: EventApi[]) => ({
  type: "CURRENT_EVENTS",
  payload: event,
});

// 리듀서
export const CalendarEvents = (
  state = initialState,
  action: CalendarActions
): CalendarState => {
  switch (action.type) {
    case "WEEKENDS_VISIBLE":
      return { ...state, weekendsVisible: action.payload };
    case "CURRENT_EVENTS":
      return { ...state, currentEvents: action.payload };
    default:
      return state;
  }
};
