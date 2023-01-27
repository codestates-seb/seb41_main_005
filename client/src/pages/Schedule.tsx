import React from "react";
import styled from "styled-components";
import Calendar from "../components/schedule/Calendar";
import Footer from "../components/Footer";

const CalendarContainer = styled.div`
  display: flex;
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
      <Footer />
    </>
  );
};

export default Schedule;
