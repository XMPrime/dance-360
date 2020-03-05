import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import ScoringSideMenu from "./ScoringSideMenu";
import Rectangle from "./Rectangle";
import ScoringBreakdown from "./ScoringBreakdown";

import {
  setButtonsData,
  setRoutinesData,
  setScoringBreakdownData,
  setTargetRoutine
  // setButtonGrades
  // setDivisionId
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
  const { judgeGroupId, judgePosition } = useSelector(state => state.judgeInfo);
  const {
    buttonsData,
    routinesData,
    scoringBreakdownData,
    targetRoutine,
    // scrollPos,
    displaySideMenu
  } = useSelector(state => state.scoring);
  const {
    performance_division_level_id,
    date_routine_id,
    number,
    routine,
    studio_code,
    age_division,
    performance_division,
    routine_category,
    online_scoring_id
  } = useSelector(state => state.scoring.targetRoutine);
  const axios = require("axios");

  const buttonsList =
    buttonsData !== null && performance_division_level_id !== null
      ? createButtonsList(buttonsData, performance_division_level_id)
      : null;

  const topStyle = {
    height: `${Math.max(
      Math.floor(
        buttonsData !== null && targetRoutine !== null
          ? (buttonsList.top.length * rectangleHeight) / minColumns
          : 0
      ),
      minRows * rectangleHeight
    )}px`
  };

  const bottomStyle = {
    height: `${Math.max(
      Math.floor(
        buttonsData !== null && targetRoutine !== null
          ? (buttonsList.bottom.length * rectangleHeight) / minColumns
          : 0
      ),
      minRows * rectangleHeight
    )}px`
  };

  const scoringTitle = (
    <div>
      <div className="scoring-title">{`#${number} - ${routine} (${studio_code})`}</div>
      <div className="scoring-subtitle">{`${age_division} • ${performance_division} • ${routine_category}`}</div>
    </div>
  );

  function createButtonsList(buttonsData, performance_division_level_id) {
    const targetButtonData = buttonsData.find(element => {
      return element.level_id === performance_division_level_id;
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
            <Rectangle
              level={3}
              isHeader={false}
              text={button.level_3_name}
              level_4_id={button.id}
              level_1_id={button.level_1_id}
            />
          );
        } else {
          //level 4 buttons
          return (
            <Rectangle
              level={4}
              isHeader={false}
              text={button.level_4_name}
              level_4_id={button.id}
              level_1_id={button.level_1_id}
            />
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
    if (document.querySelector("textarea") !== document.activeElement) {
      if (e.code === "ArrowUp") {
        window.scrollTo(0, 0);
      }
      if (e.code === "ArrowDown") {
        window.scrollTo(0, document.body.scrollHeight);
      }
    }
  }

  function submitScore(e) {
    // FAKE SUBMIT THAT CONSOLES CURRENT STATE OF BUTTON GRADES
    if (e.code === "Enter") {
      let rectangles = document.querySelectorAll("div.rectangle.level_4");
      let buttonsArray = [];
      rectangles.forEach(rectangle => {
        buttonsArray.push({
          level_4_id: Number(rectangle.attributes.level_4_id.value),
          level_1_id: Number(rectangle.attributes.level_1_id.value),
          good: rectangle.attributes.good.value === "true" ? true : false
        });
      });
      console.log(buttonsArray);
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
          competition_group_id: judgeGroupId,
          position: judgePosition
        }
      })
      .then(response => {
        // console.log(response.data);
        if (response.data.length !== 0) {
          const initialRoutine = response.data[0];
          dispatch(setRoutinesData(response.data));
          dispatch(setTargetRoutine(initialRoutine));
        }
      });

    axios.get(buttonsUrl).then(response => {
      // console.log(response);
      dispatch(setButtonsData(response.data));
    });

    axios
      .get(scoringBreakdownUrl, {
        params: {
          event_id: selectedEvent.id
        }
      })
      .then(response => {
        dispatch(setScoringBreakdownData(response.data));
      });
  }, []);

  useEffect(() => {
    // window.addEventListener("scroll", () => handleScroll(scrollPos));
    // window.addEventListener("wheel", handleScroll);
    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("keydown", submitScore);
  }, []);

  return (
    <div className="generic-page">
      <Header title={scoringTitle} barIcon={true}></Header>
      {displaySideMenu ? <ScoringSideMenu /> : null}
      {buttonsData === null || routinesData === null ? null : (
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
