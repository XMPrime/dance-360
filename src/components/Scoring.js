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
  setTargetRoutine,
  setButtonGrades
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

    const buttonGrades = fullButtonsList.map(button => {
      return {
        level_4_id: button.props.level_4_id,
        level_1_id: button.props.level_1_id,
        good: button.props.good
      };
    });

    return { top, bottom, buttonGrades };
  }

  function createButtonsPostData(buttonsList) {
    const postData = buttonsList.map(button => {
      return {
        level_4_id: button.props.level_4_id,
        level_1_id: button.props.level_1_id,
        good: button.props.good
      };
    });
    console.log(postData);
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
    // MAKE A FAKE SUBMIT THAT CONSOLES CURRENT STATE OF BUTTON GRADES
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
    }

    // return (dispatch, getState) => {
    //   const url = "https://api.d360test.com/api/coda/score";
    //   const axios = require("axios");
    //   const event_id = getState().events.selectedEvent.id;
    //   const tour_date_id = getState().tourDates.tourDateId;
    //   const {judgeGroupId, judgeId, judgePosition, judgeIsTeacher} = getState().judgeInfo.judgeGroupId;
    //   const {routineId, } = getState().scoring;

    // axios
    //   .post(url, {
    //     isTabulator: BOOLEAN,
    //     competition_group_id: judgeGroupId,
    //     date_routine_id: INT,
    //     event_id,
    //     tour_date_id,
    //     data: {
    //       online_scoring_id: INT,
    //       staff_id: judgeId,
    //       note: STRING,
    //       score: INT,
    //       not_friendly: BOOLEAN,
    //       i_choreographed: BOOLEAN,
    //       position: INT,
    //       teacher_critique: BOOLEAN,
    //       is_coda: true,
    //       buttons: [
    //         {
    //           level_4_id: INT,
    //           level_1_id: INT,
    //           good: BOOLEAN
    //         }
    //       ],
    //       strongest_level_1_id: INT,
    //       weakest_level_1_id: INT
    //     }
    //   })
    //   .then(response => {
    //     if (response.status === 200) {
    //     }
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
    // };
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
          dispatch(setRoutinesData(response.data));
          // dispatch(setDivisionId(initialRoutine.performance_division_level_id));
          dispatch(
            setTargetRoutine(
              initialRoutine.performance_division_level_id,
              initialRoutine.date_routine_id,
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
    document.addEventListener("keydown", submitScore);
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
