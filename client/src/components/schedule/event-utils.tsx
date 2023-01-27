import { EventInput } from "@fullcalendar/core";

let eventGuid = 0;
const todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: "마감 d-1",
    start: todayStr,
  },
  {
    id: createEventId(),
    title: "계단청소",
    start: todayStr + "T12:00:00",
  },
];

export function createEventId() {
  return String(eventGuid++);
}
