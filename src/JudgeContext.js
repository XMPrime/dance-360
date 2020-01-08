import React, { useState, useEffect } from "react";
import history from "./history";
const JudgeContext = React.createContext();

function JudgeContextProvider(props) {
  // const axios = require("axios");
  const [username, setUsername] = useState("jason");
  const [password, setPassword] = useState("testtest");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [judgeDropdownIsOpen, setJudgeDropdownIsOpen] = useState(false);
  const [sideMenuIsOpen, setSideMenuIsOpen] = useState(false);
  const [eventsData, setEventsData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState();
  const [tourDatesData, setTourDatesData] = useState([]);
  const [judgesData, setJudgesData] = useState([]);
  const [competitionGroupsData, setCompetitionGroupsData] = useState([]);
  // const [judgeInfo, setJudgeInfo] = useState({
  //   name: "",
  //   position: "",
  //   isTeacher: "",
  //   competitionGroup: ""
  // });

  // function useJudgeInfo() {
  //   const judge = document.getElementById("judge").value;
  //   const position = document.getElementById("position").value;
  //   const isTeacher = document.getElementById("teacher").value;
  //   const competition = document.getElementById("competition").value;

  //   setJudgeInfo({
  //     name: judge,
  //     position: position,
  //     isTeacher: isTeacher,
  //     competitionGroup: competition
  //   });
  //   console.log(judgeInfo);

  //   history.push("/scoring");
  // }

  function pageRouter(route) {
    route === "goBack" ? history.goBack() : history.push(route);
  }

  function findClosestDate(tourDatesData) {
    const now = new Date();
    let closest = Infinity;
    let closestDate;

    tourDatesData.forEach(tourDate => {
      const endDate = new Date(tourDate.end_date);

      if (Math.abs(now - endDate) < Math.abs(now - closest) && now < endDate) {
        closest = Date.parse(endDate);
        closestDate = tourDate.end_date;
      }
    });
    return closestDate;
  }

  function transformTourDateData(tourDateData) {
    const monthNames = {
      1: "Jan",
      2: "Feb",
      3: "Mar",
      4: "Apr",
      5: "May",
      6: "Jun",
      7: "Jul",
      8: "Aug",
      9: "Sep",
      10: "Oct",
      11: "Nov",
      12: "Dec"
    };
    const startDate = tourDateData.start_date;
    const endDate = tourDateData.end_date;
    const cityName = tourDateData.event_city.name;
    // Ternary statement used to get rid of 0 from single digit days or months
    const startDay =
      startDate[8] !== "0"
        ? `${startDate[8]}${startDate[9]}`
        : `${startDate[9]}`;
    const endDay =
      endDate[8] !== "0" ? `${endDate[8]}${endDate[9]}` : `${endDate[9]}`;
    //Months converted to INTs to work with monthNames
    const startMonth =
      startDate[5] !== "0"
        ? Number(`${startDate[5]}${startDate[6]}`)
        : startDate[6];
    const endMonth =
      endDate[5] !== "0"
        ? Number(`${endDate[5]}${endDate[6]}`)
        : `${endDate[6]}`;
    const startYear = startDate[0] + startDate[1] + startDate[2] + startDate[3];
    const endYear = endDate[0] + endDate[1] + endDate[2] + endDate[3];

    if (startMonth !== endMonth) {
      return `${cityName} - ${monthNames[startMonth]} ${startDay}, ${startYear} - ${monthNames[endMonth]} ${endDay}, ${endYear}`;
    } else {
      return `${cityName} - ${monthNames[startMonth]} ${startDay}-${endDay}, ${startYear}`;
    }
  }

  function toggleSideMenuIsOpen(e) {
    setSideMenuIsOpen(!sideMenuIsOpen);
  }
  function toggleJudgeDropdown(e) {
    setJudgeDropdownIsOpen(!judgeDropdownIsOpen);
  }

  function handleChange(e) {
    const { value } = e.target;
    e.target.id === "username" ? setUsername(value) : setPassword(value);
  }

  function logout(e) {
    setIsLoggedIn(false);
  }

  function login(e) {
    const url = "https://api.d360test.com/api/auth/signin";
    const axios = require("axios");
    axios
      .post(url, {
        name: username,
        password: password
      })
      .then(response => {
        if (response.status === 200) {
          setIsLoggedIn(true);
          history.push("/events");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  return (
    <JudgeContext.Provider
      value={{
        username,
        password,
        isLoggedIn,
        handleChange,
        login,
        logout,
        pageRouter,
        judgeDropdownIsOpen,
        toggleJudgeDropdown,
        toggleSideMenuIsOpen,
        eventsData,
        setEventsData,
        selectedEvent,
        setSelectedEvent,
        tourDatesData,
        setTourDatesData,
        transformTourDateData,
        findClosestDate,
        judgesData,
        setJudgesData,
        competitionGroupsData,
        setCompetitionGroupsData
      }}
    >
      {props.children}
    </JudgeContext.Provider>
  );
}

export { JudgeContextProvider, JudgeContext };
