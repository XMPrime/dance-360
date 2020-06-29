/* eslint-disable react/jsx-props-no-spreading */
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
  setButtons,
} from '../../redux/scoringReducer';
import { ButtonTable, RectangleProps, ModalProps } from '../../utils/models';

const { rectangleHeight, minColumns, minRows } = new ButtonTable({
  height: 30,
  columns: 5,
  rows: 4,
});

export default function Scoring() {
  const dispatch = useDispatch();
  const [
    selectedEvent,
    tourDateId,
    { judgeGroupId, judgePosition },
    {
      buttonsData,
      routinesData,
      displaySideMenu,
      modal,
      targetRoutine,
      targetRoutineIndex,
      buttons,
    },
  ] = useSelector((state) => [
    state.events.selectedEvent,
    state.tourDates.tourDateId,
    state.judgeInfo,
    state.scoring,
  ]);

  const {
    performance_division_level_id,
    routine,
    studio_code,
    age_division,
    performance_division,
    routine_category,
  } = targetRoutine;

  function createButtonsList(data, id) {
    const targetButtonData = data.find((element) => element.level_id === id);
    const buttonsDivider = targetButtonData.level_4.findIndex(
      (button) => button.header_name === 'Performance',
    );

    const fullButtonsList = targetButtonData.level_4.map((button) => (
      <Rectangle key={button.id} {...new RectangleProps(button)} />
    ));
    const top = fullButtonsList.slice(0, buttonsDivider);
    const bottom = fullButtonsList.slice(buttonsDivider);

    return [top, bottom];
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

  function calcStyle(rectangles) {
    return {
      height: `${Math.max(
        Math.floor(
          buttonsData !== false && performance_division_level_id !== undefined
            ? (rectangles.length * rectangleHeight) / minColumns
            : 0,
        ),
        minRows * rectangleHeight,
      )}px`,
    };
  }

  const scoringTitle = routine ? (
    <>
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
    </>
  ) : (
    <div className="scoring-title">Nothing to see here...</div>
  );

  const saveProps = {
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
        // TODO move postdata to redux so that you dont have to pass it through to all these other components
        dispatch(submitScore());
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
    document.addEventListener('keydown', handleKeydown);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const buttonsList =
      buttonsData !== false && performance_division_level_id !== undefined
        ? createButtonsList(buttonsData, performance_division_level_id)
        : '';
    dispatch(setButtons(buttonsList));
    // eslint-disable-next-line
  }, [buttonsData, targetRoutineIndex]);

  return (
    <div className="generic-page">
      <Header title={scoringTitle} barIcon />

      {modal && <Modal {...new ModalProps(saveProps)} />}

      {displaySideMenu && <ScoringSideMenu />}

      {(buttonsData || routinesData) && (
        <div className="scoring-body">
          {buttons &&
            buttons.map((button, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={i} className="buttons-half">
                <div
                  className="rectangles-container"
                  style={calcStyle(buttons[i])}
                >
                  {button}
                </div>
              </div>
            ))}
        </div>
      )}

      <ScoringBreakdown />
    </div>
  );
}
