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
    let buttonsList_1 = fullButtonsList.slice(0, buttonsDivider);
    let buttonsList_2 = fullButtonsList.slice(buttonsDivider);

    while (buttonsList_1.length < minRectangles) {
      buttonsList_1.push(<div className="blank-rectangle"></div>);
    }
    while (buttonsList_2.length < minRectangles) {
      buttonsList_2.push(<div className="blank-rectangle"></div>);
    }

    return { buttonsList_1, buttonsList_2 };
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
        console.log(response);
        dispatch(setRoutinesData(response.data));
        dispatch(setDivisionId(response.data[0].performance_division_level_id));
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
  return (
    <div className="generic-page">
      <Header title="SCORING:" barIcon={true}></Header>
      {displaySideMenu ? <ScoringSideMenu /> : null}
      {buttonsData === null || divisionId === null ? null : (
        <div className="scoring-body">
          <div id="top-buttons">
            <div
              className="rectangles-container"
              style={{
                height: `${Math.max(
                  Math.floor(
                    (createButtonsList(buttonsData, divisionId).buttonsList_1
                      .length *
                      rectangleHeight) /
                      minColumns
                  ),
                  minRows * rectangleHeight
                )}px`
              }}
            >
              {createButtonsList(buttonsData, divisionId).buttonsList_1}
            </div>
          </div>
          <div id="bottom-buttons">
            <div
              className="rectangles-container"
              style={{
                height: `${Math.max(
                  Math.floor(
                    (createButtonsList(buttonsData, divisionId).buttonsList_2
                      .length *
                      rectangleHeight) /
                      minColumns
                  ),
                  minRows * rectangleHeight
                )}px`
              }}
            >
              {createButtonsList(buttonsData, divisionId).buttonsList_2}
            </div>
          </div>
        </div>
      )}
      <ScoringBreakdown />
    </div>
  );
}
