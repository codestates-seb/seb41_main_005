import React from "react";
import styled from "styled-components";
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "./event-utils";
import CalendarSide from "./CalendarSide";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../util/redux";
import { setCurrentEvents } from "../../util/redux/CalendarEvents";

const CalendarContainer = styled.div`
  display: flex;
  font-size: 14px;
  width: 100%;
`;

const Calendersection = styled.div`
  display: flex;
  padding: 3em;
  width: auto;
  flex-grow: 1;
`;

const CalendarWrapper = styled.div`
  flex-grow: 1;
  span {
    overflow: hidden;
    &:hover {
      overflow: visible;
    }
    b {
      margin-right: 2px;
    }
  }
  .fc-button-primary {
    background-color: #6f38c5;
    border: none;
    &:hover {
      background-color: #fcc72c;
      transition: all 0.5s;
    }
  }
  .fc .fc-button-primary:not(:disabled).fc-button-active {
    background-color: #fcc72c;
  }
  .fc-day-sun {
    color: red;
  }
  .fc-day-sat {
    color: blue;
  }
`;

const Calendar = () => {
  const dispatch = useDispatch();
  const weekendsVisible = useSelector(
    (state: RootState) => state.CalendarEvents.weekendsVisible
  );
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const title = prompt("새 일정을 입력해주세요!");
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const renderEventContent = (eventContent: EventContentArg) => {
    return (
      <span>
        <b>{eventContent.timeText}</b>
        <i>{eventContent.event.title}</i>
      </span>
    );
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events: EventApi[]) => {
    dispatch(setCurrentEvents(events));
  };

  return (
    <CalendarContainer>
      <CalendarSide />
      <Calendersection>
        <CalendarWrapper>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={weekendsVisible}
            initialEvents={INITIAL_EVENTS}
            select={handleDateSelect}
            eventContent={renderEventContent}
            eventClick={handleEventClick}
            eventsSet={handleEvents}
            locale={"ko"}
            buttonText={{
              today: "오늘",
              month: "월간",
              week: "주간",
              day: "일간",
            }}
          />
        </CalendarWrapper>
      </Calendersection>
    </CalendarContainer>
  );
};

export default Calendar;
