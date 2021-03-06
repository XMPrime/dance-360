/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setRoutinesData,
  setTargetRoutine,
  toggleSideMenu,
} from '../redux/scoringReducer';
import CONST from '../utils/constants';

const axios = require('axios');

export default function ScoringSideMenu() {
  const dispatch = useDispatch();

  const [
    selectedEvent,
    { tourDate, tourDateId },
    { routinesData, targetRoutine },
    { judgeGroupId, judgePosition },
  ] = useSelector((state) => [
    state.events.selectedEvent,
    state.tourDates,
    state.scoring,
    state.judgeInfo,
  ]);

  const getData = {
    params: {
      tour_date_id: tourDateId,
      competition_group_id: judgeGroupId,
      position: judgePosition,
    },
  };

  function handleClick(routine, i) {
    if (routine.score === null) {
      dispatch(setTargetRoutine(routine, i));
      dispatch(toggleSideMenu());
    }
    return null;
  }

  function refreshRoutines(data) {
    const routinesUrl = `${CONST.API}/coda/routines`;
    return async () => {
      try {
        const response = await axios.get(routinesUrl, data);

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
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    };
  }

  function handleKeyPress(e, routine, i) {
    if (e.key === 'Enter' && routine.score === null) {
      handleClick(routine, i);
    }
  }

  function getClassName(routine) {
    if (routine === targetRoutine) {
      return 'scoring-side-menu__routine--selected';
    }
    if (!routine.score) {
      return 'scoring-side-menu__routine--unrestricted';
    }
    return 'scoring-side-menu__routine--restricted';
  }

  const routinesList = routinesData.length
    ? routinesData.map((routine, i) => (
        // eslint-disable-next-line react/jsx-indent
        <div
          className={`scoring-side-menu__routine ${getClassName(routine)}`}
          key={routine.date_routine_id}
          onClick={() => handleClick(routine, i)}
          onKeyDown={(e) => handleKeyPress(e, routine, i)}
          tabIndex={i}
          role="button"
        >
          <div className="routine-text__list-number">{`#${
            routine.number ? routine.number : i + 1
          }${routine.has_a ? 'a' : ''}`}</div>
          <div className="routine-text__routine-name">{routine.routine}</div>
        </div>
      ))
    : [];

  return (
    <>
      <div className="scoring-side-menu">
        <div className="scoring-side-menu__routines-list">
          <div className="scoring-side-menu__header">
            <img
              src={`https://assets.dance360.com/coda/${selectedEvent.id}.svg`}
              className="scoring-side-menu__image"
              alt={selectedEvent.name}
            />
            <div className="scoring-side-menu__tour-date">{tourDate}</div>
          </div>
          {routinesList}
        </div>
        <button
          className="btn btn-refresh"
          onClick={() => refreshRoutines(getData)}
          type="button"
        >
          <i className="fas fa-redo" />
          REFRESH
        </button>
      </div>
      <div
        className="modal-background transparent"
        onClick={() => dispatch(toggleSideMenu())}
        role="alertdialog"
      />
    </>
  );
}
