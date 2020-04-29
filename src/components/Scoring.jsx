/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from './Header';
import ScoringSideMenu from './ScoringSideMenu';
import Rectangle from './Rectangle';
import ScoringBreakdown from './ScoringBreakdown';
import ScoringModal from './ScoringModal';

import {
  setButtonsData,
  setRoutinesData,
  setScoringBreakdownData,
  setTargetRoutine,
  // setButtonGrades
  // setDivisionId
  // trackScrollPos
} from '../redux/scoringReducer';

const axios = require('axios');

export default function Scoring() {
  // Variables for formatting button table
  const rectangleHeight = 30; // pixels
  const minColumns = 5;
  const minRows = 4;
  const minRectangles = minColumns * minRows;

  const dispatch = useDispatch();
  const selectedEvent = useSelector((state) => state.events.selectedEvent);
  const tourDateId = useSelector((state) => state.tourDates.tourDateId);
  const { judgeGroupId, judgePosition } = useSelector(
    (state) => state.judgeInfo,
  );
  const {
    buttonsData,
    routinesData,
    // scrollPos,
    displaySideMenu,
    modal,
  } = useSelector((state) => state.scoring);

  const {
    performance_division_level_id,
    number,
    routine,
    studio_code,
    age_division,
    performance_division,
    routine_category,
  } = useSelector((state) => state.scoring.targetRoutine);

  function createButtonsList(data, id) {
    const targetButtonData = data.find((element) => {
      return element.level_id === id;
    });

    const buttonsDivider = targetButtonData.level_4.findIndex(
      (element) => element.header_name === 'Performance',
    );

    const fullButtonsList = targetButtonData.level_4.map((button) => {
      if (button.header_name) {
        return (
          <Rectangle
            key={button.id}
            level={button.header_level}
            isHeader
            text={button.header_name}
          />
        );
      }

      if (button.level_4_name === null) {
        // level 3 buttons
        return (
          <Rectangle
            key={button.id}
            level={3}
            isHeader={false}
            text={button.level_3_name}
            level_4_id={button.id}
            level_1_id={button.level_1_id}
          />
        );
      }

      // level 4 buttons
      return (
        <Rectangle
          key={button.id}
          level={4}
          isHeader={false}
          text={button.level_4_name}
          level_4_id={button.id}
          level_1_id={button.level_1_id}
        />
      );
    });
    const top = fullButtonsList.slice(0, buttonsDivider);
    const bottom = fullButtonsList.slice(buttonsDivider);

    while (top.length <= minRectangles) {
      top.push(<div className="blank-rectangle" />);
    }
    while (bottom.length <= minRectangles) {
      bottom.push(<div className="blank-rectangle" />);
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
    if (document.querySelector('textarea') !== document.activeElement) {
      if (e.code === 'ArrowUp') {
        window.scrollTo(0, 0);
      }
      if (e.code === 'ArrowDown') {
        window.scrollTo(0, document.body.scrollHeight);
      }
    }
  }

  const buttonsList =
    buttonsData !== false && performance_division_level_id !== undefined
      ? createButtonsList(buttonsData, performance_division_level_id)
      : '';

  const topStyle = {
    height: `${Math.max(
      Math.floor(
        buttonsData !== false && performance_division_level_id !== undefined
          ? (buttonsList.top.length * rectangleHeight) / minColumns
          : 0,
      ),
      minRows * rectangleHeight,
    )}px`,
  };

  const bottomStyle = {
    height: `${Math.max(
      Math.floor(
        buttonsData !== false && performance_division_level_id !== undefined
          ? (buttonsList.bottom.length * rectangleHeight) / minColumns
          : 0,
      ),
      minRows * rectangleHeight,
    )}px`,
  };

  const scoringTitle = routine ? (
    <div>
      <div className="scoring-title">
        {`#${number && number} - ${routine && routine} (${
          studio_code && studio_code
        })`}
      </div>
      <div className="scoring-subtitle">
        {`${age_division && age_division} • ${
          performance_division && performance_division
        } • ${routine_category && routine_category}`}
      </div>
    </div>
  ) : (
    <div>
      <div className="scoring-title">Nothing to see here...</div>
    </div>
  );

  useEffect(() => {
    const buttonsUrl = 'https://api.d360test.com/api/coda/buttons';
    const scoringBreakdownUrl =
      'https://api.d360test.com/api/coda/scoring-breakdown';

    axios.get(buttonsUrl).then((response) => {
      // console.log(response);
      dispatch(setButtonsData(response.data));
    });

    axios
      .get(scoringBreakdownUrl, {
        params: {
          event_id: selectedEvent.id,
        },
      })
      .then((response) => {
        // console.log(response);
        dispatch(setScoringBreakdownData(response.data));
      });
  }, []);

  useEffect(() => {
    const routinesUrl = 'https://api.d360test.com/api/coda/routines';

    axios
      .get(routinesUrl, {
        params: {
          tour_date_id: tourDateId,
          competition_group_id: judgeGroupId,
          position: judgePosition,
        },
      })
      .then((response) => {
        // console.log(response);
        if (response.data.length !== 0) {
          let initialRoutine = response.data[0];
          let initialRoutineIndex = 0;
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].score === null) {
              initialRoutine = response.data[i];
              initialRoutineIndex = i;
              dispatch(setRoutinesData(response.data));
              dispatch(setTargetRoutine(initialRoutine, initialRoutineIndex));
              break;
            }
          }
          dispatch(setRoutinesData(response.data));
        }
      });
  }, []);

  useEffect(() => {
    // window.addEventListener("scroll", () => handleScroll(scrollPos));
    // window.addEventListener("wheel", handleScroll);
    document.addEventListener('keydown', handleKeydown);
  }, []);

  return (
    <div className="generic-page">
      <Header title={scoringTitle} barIcon />
      {modal ? <ScoringModal /> : null}
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
