import React from "react";
import styled from "styled-components";
import { EventApi, formatDate } from "@fullcalendar/core";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../util/redux";
import { setWeekendsVisible } from "../../util/redux/CalendarEvents";

const SideContainer = styled.div`
  width: 300px;
  line-height: 1.5;
  height: 100vh;
  margin-top: 12px;
  border-right: 1px solid #d3e2e8;
  h2 {
    margin: 0;
    font-size: 16px;
  }

  ul {
    margin: 0;
    padding: 0 0 0 1.5em;
    list-style: disc;
  }

  li {
    margin: 1.5em 0;
    padding: 0;
  }

  em {
    margin-right: 3px;
  }
`;

const SideSection = styled.div`
  padding: 2em;
  input {
    margin-right: 5px;
  }
`;

const CalendarSide = () => {
  const dispatch = useDispatch();

  const weekendsVisible = useSelector(
    (state: RootState) => state.CalendarEvents.weekendsVisible
  );
  const currentEvents = useSelector(
    (state: RootState) => state.CalendarEvents.currentEvents
  );

  const handleWeekendsToggle = () => {
    dispatch(setWeekendsVisible(!weekendsVisible));
  };

  const renderSidebarEvent = (event: EventApi) => {
    return (
      <li key={event.id}>
        <em>
          {formatDate(event.start!, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </em>
        <i>{event.title}</i>
      </li>
    );
  };

  return (
    <SideContainer>
      <SideSection>
        <h2>스케줄 사용법</h2>
        <ul>
          <li>날짜를 선택하면 새 일정을 만들라는 메시지가 표시됩니다.</li>
          <li>드래그 & 드롭으로 일정의 시간을 조정하세요.</li>
          <li>일정을 클릭하여 삭제합니다.</li>
        </ul>
      </SideSection>
      <SideSection>
        <label>
          <input
            type="checkbox"
            checked={weekendsVisible}
            onChange={handleWeekendsToggle}
          ></input>
          주말 포함
        </label>
      </SideSection>
      <SideSection>
        <h2>전체 일정 ({currentEvents.length})</h2>
        <ul>{currentEvents.map(renderSidebarEvent)}</ul>
      </SideSection>
    </SideContainer>
  );
};

export default CalendarSide;
