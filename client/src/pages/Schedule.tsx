import React from "react";
import styled from "styled-components";
import Calendar from "../components/schedule/Calendar";

const CalendarContainer = styled.div`
  display: flex;
  max-width: 1060px;
  height: auto;
  margin: auto;
  padding-top: 65px;
`;

const Schedule = () => {
  return (
    <>
      <CalendarContainer>
        <Calendar />
      </CalendarContainer>
    </>
  );
};

export default Schedule;
