import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./Header";
import ScoringSideMenu from "./ScoringSideMenu";
import Rectangle from "./Rectangle";
import ScoringBreakdown from "./ScoringBreakdown";

import {
  setButtonsData,
  setRoutinesData,
  setScoringBreakdownData,
  setTargetRoutine,
  setDivisionId
  // trackScrollPos
} from "../redux/scoringReducer";

export default function Scoring() {
  // Variables for formatting button table
  const rectangleHeight = 30; //pixels
  const minColumns = 6;
  const minRows = 4;
  const minRectangles = minColumns * minRows;

  const dispatch = useDispatch();
  const selectedEvent = useSelector(state => state.events.selectedEvent);
  const tourDateId = useSelector(state => state.tourDates.tourDateId);
  const judgeInfo = useSelector(state => state.judgeInfo);
  const {
    buttonsData,
    routinesData,
    scoringBreakdownData,
    divisionId,
    routineNumber,
    routineName,
    studioCode,
    ageDivision,
    performanceDivision,
    routineCategory,
    // scrollPos,
    // topButtons,
    displaySideMenu
  } = useSelector(state => state.scoring);
  const axios = require("axios");

  function createButtonsList(buttonsData, divisionId) {
    const targetButtonData = buttonsData.find(element => {
      return element.level_id === divisionId;
    });

    const buttonsDivider = targetButtonData.level_4.findIndex(
      element => element.header_name === "Performance"
    );

    const fullButtonsList = targetButtonData.level_4.map(button => {
      if (button.header_name) {
        return (
          <Rectangle
            level={button.header_level}
            isHeader={true}
            text={button.header_name}
          />
        );
      } else {
        if (button.level_4_name === null) {
          //level 3 buttons
          return (
            <Rectangle level={3} isHeader={false} text={button.level_3_name} />
          );
        } else {
          //level 4 buttons
          return (
            <Rectangle level={4} isHeader={false} text={button.level_4_name} />
          );
        }
      }
    });
    let top = fullButtonsList.slice(0, buttonsDivider);
    let bottom = fullButtonsList.slice(buttonsDivider);

    while (top.length < minRectangles) {
      top.push(<div className="blank-rectangle"></div>);
    }
    while (bottom.length < minRectangles) {
      bottom.push(<div className="blank-rectangle"></div>);
    }

    return { top, bottom };
  }

  // function handleScroll(e) {

  //   console.log(e.deltaY);
  //   const body = document.querySelector(".App");
  //   if (e.deltaY === -100) {
  //     console.log("up");
  //     body.scrollBy(0, -1000);
  //   }
  //   if (e.deltaY === 100) {
  //     console.log("down");
  //     body.scrollBy(0, 1000);
  //   }
  // }

  function handleKeydown(e) {
    if (e.code === "ArrowUp") {
      window.scrollTo(0, 0);
    }
    if (e.code === "ArrowDown") {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }

  useEffect(() => {
    const routinesUrl = "https://api.d360test.com/api/coda/routines";
    const buttonsUrl = "https://api.d360test.com/api/coda/buttons";
    const scoringBreakdownUrl =
      "https://api.d360test.com/api/coda/scoring-breakdown";

    axios
      .get(routinesUrl, {
        params: {
          tour_date_id: tourDateId,
          competition_group_id: judgeInfo.judgeGroupId,
          position: judgeInfo.judgePosition
        }
      })
      .then(response => {
        console.log(response.data);
        if (response.data.length !== 0) {
          const initialRoutine = response.data[0];
          console.log("pass");
          dispatch(setRoutinesData(response.data));
          // dispatch(setDivisionId(initialRoutine.performance_division_level_id));
          dispatch(
            setTargetRoutine(
              initialRoutine.performance_division_level_id,
              initialRoutine.number,
              initialRoutine.routine,
              initialRoutine.studio_code,
              initialRoutine.age_division,
              initialRoutine.performance_division,
              initialRoutine.routine_category
            )
          );
        }
      });

    axios.get(buttonsUrl).then(response => {
      console.log(response);
      dispatch(setButtonsData(response.data));
    });
    axios
      .get(scoringBreakdownUrl, {
        params: {
          event_id: selectedEvent.id
        }
      })
      .then(response => {
        // console.log(response);
        dispatch(setScoringBreakdownData(response.data));
      });
  }, []);

  useEffect(() => {
    // window.addEventListener("scroll", () => handleScroll(scrollPos));
    // window.addEventListener("wheel", handleScroll);
    document.addEventListener("keydown", handleKeydown);
  }, []);

  const buttonsList =
    buttonsData === null || divisionId === null
      ? null
      : createButtonsList(buttonsData, divisionId);
  const topStyle = {
    height: `${Math.max(
      Math.floor(
        buttonsData === null || divisionId === null
          ? 0
          : (buttonsList.top.length * rectangleHeight) / minColumns
      ),
      minRows * rectangleHeight
    )}px`
  };
  const bottomStyle = {
    height: `${Math.max(
      Math.floor(
        buttonsData === null || divisionId === null
          ? 0
          : (buttonsList.bottom.length * rectangleHeight) / minColumns
      ),
      minRows * rectangleHeight
    )}px`
  };

  const scoringTitle = (
    <div>
      <div className="scoring-title">{`#${routineNumber} - ${routineName} (${studioCode})`}</div>
      <div className="scoring-subtitle">{`${ageDivision} • ${performanceDivision} • ${routineCategory}`}</div>
    </div>
  );

  return (
    <div className="generic-page">
      <Header title={scoringTitle} barIcon={true}></Header>
      {displaySideMenu ? <ScoringSideMenu /> : null}
      {buttonsData === null || divisionId === null ? null : (
        <div className="scoring-body">
          <div id="top-buttons">
            <div className="rectangles-container" style={topStyle}>
              {buttonsList.top}
            </div>
          </div>
          <div id="bottom-buttons">
            <div className="rectangles-container" style={bottomStyle}>
              {buttonsList.bottom}
            </div>
          </div>
        </div>
      )}
      <ScoringBreakdown />
    </div>
  );
}
