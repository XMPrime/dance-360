/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../generic/Header';
import ScoringSideMenu from '../ScoringSideMenu';
import Rectangle from '../Rectangle';
import ScoringBreakdown from '../ScoringBreakdown';
import Modal from '../generic/Modal';

import {
  setStrongestLevel1Id,
  setWeakestLevel1Id,
} from '../../redux/scoringBreakdownReducer';
import {
  getButtonsData,
  getScoringBreakdownData,
  getRoutinesData,
  toggleScoringModal,
  submitScore,
} from '../../redux/scoringReducer';

export default function Scoring() {
  // Variables for formatting button table
  const rectangleHeight = 30; // pixels
  const minColumns = 5;
  const minRows = 4;
  const minRectangles = minColumns * minRows;

  const dispatch = useDispatch();
  const selectedEvent = useSelector((state) => state.events.selectedEvent);
  const tourDateId = useSelector((state) => state.tourDates.tourDateId);
  const { judgeGroupId, judgePosition, judgeId, judgeIsTeacher } = useSelector(
    (state) => state.judgeInfo,
  );
  const {
    buttonsData,
    routinesData,
    displaySideMenu,
    modal,
    targetRoutineIndex,
    buttonGrades,
  } = useSelector((state) => state.scoring);
  const nextRoutine = routinesData[targetRoutineIndex + 1];
  const nextRoutineIndex = targetRoutineIndex + 1;

  const {
    performance_division_level_id,
    routine,
    studio_code,
    age_division,
    performance_division,
    routine_category,
    date_routine_id,
    online_scoring_id,
  } = useSelector((state) => state.scoring.targetRoutine);

  const {
    score,
    note,
    familyFriendly,
    iChoreographed,
    strongestId,
    weakestId,
  } = useSelector((state) => state.scoringBreakdown);

  const isTabulator = useSelector((state) => state.login.isTabulator);
  const event_id = useSelector((state) => state.events.selectedEvent.id);
  const tour_date_id = useSelector((state) => state.tourDates.tourDateId);

  const postData = {
    isTabulator,
    competition_group_id: judgeGroupId,
    date_routine_id,
    event_id,
    tour_date_id,
    data: {
      online_scoring_id,
      staff_id: judgeId,
      note,
      score,
      not_friendly: familyFriendly,
      i_choreographed: iChoreographed,
      position: judgePosition,
      teacher_critique: judgeIsTeacher,
      is_coda: true,
      buttons: buttonGrades,
      strongest_level_1_id: strongestId,
      weakest_level_1_id: weakestId,
    },
  };

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

  function calcStyle(buttons) {
    return {
      height: `${Math.max(
        Math.floor(
          buttonsData !== false && performance_division_level_id !== undefined
            ? (buttons.length * rectangleHeight) / minColumns
            : 0,
        ),
        minRows * rectangleHeight,
      )}px`,
    };
  }

  const scoringTitle = routine ? (
    <div>
      <div className="scoring-title">
        {`#${targetRoutineIndex + 1} - ${routine && routine} (${
          studio_code !== null ? studio_code : ' '
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

  const alert = {
    type: 'alert',
    header: 'Alert',
    body: 'Are you sure you want to save?',
    cancel: {
      text: 'CANCEL',
      func: () => {
        dispatch(toggleScoringModal());
        dispatch(setStrongestLevel1Id('', -1));
        dispatch(setWeakestLevel1Id('', 2));
      },
    },
    confirm: {
      text: 'SAVE',
      func: () => {
        dispatch(toggleScoringModal());
        dispatch(submitScore(postData, nextRoutine, nextRoutineIndex));
      },
    },
    bgFunc: () => {
      dispatch(toggleScoringModal());
      dispatch(setStrongestLevel1Id('reset', -1));
      dispatch(setWeakestLevel1Id('reset', 2));
    },
  };

  useEffect(() => {
    Promise.all([
      dispatch(getButtonsData()),
      dispatch(getScoringBreakdownData(selectedEvent)),
      dispatch(getRoutinesData(tourDateId, judgeGroupId, judgePosition)),
    ]);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
  }, []);

  return (
    <div className="generic-page">
      <Header title={scoringTitle} barIcon />
      {modal ? (
        <Modal
          type={alert.type}
          header={alert.header}
          body={alert.body}
          cancel={alert.cancel}
          confirm={alert.confirm}
          bgFunc={alert.bgFunc}
        />
      ) : null}
      {displaySideMenu ? <ScoringSideMenu /> : null}
      {buttonsData === null || routinesData === null ? null : (
        <div className="scoring-body">
          <div id="top-buttons">
            <div
              className="rectangles-container"
              style={calcStyle(buttonsList.top)}
            >
              {buttonsList.top}
            </div>
          </div>
          <div id="bottom-buttons">
            <div
              className="rectangles-container"
              style={calcStyle(buttonsList.bottom)}
            >
              {buttonsList.bottom}
            </div>
          </div>
        </div>
      )}

      <ScoringBreakdown />
    </div>
  );
}
