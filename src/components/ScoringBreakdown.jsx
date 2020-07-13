/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../redux/modalsReducer';
import {
  addScore,
  minusScore,
  editNotes,
  toggleCheckbox,
  setStrongestLevel1Id,
  setWeakestLevel1Id,
  toggleScoringBreakdownPopUp,
} from '../redux/scoringBreakdownReducer';
import { submitScore } from '../redux/scoringReducer';
import ScoringBreakdownPopUp from './ScoringBreakdownPopUp';
import { infoIcon, plusIcon, minusIcon } from '../utils/constants';
import IconButton from './generic/IconButton';
import CustomCheckbox from './generic/CustomCheckbox';
import { ModalProps } from '../utils/models';

export default function ScoringBreakdown() {
  const dispatch = useDispatch();
  const [
    { score, note, familyFriendly, iChoreographed, popUp },
    { buttonGrades },
  ] = useSelector((state) => [state.scoringBreakdown, state.scoring]);

  const saveProps = {
    type: 'scoring',
    header: 'Alert',
    body: 'Are you sure you want to save?',
    cancelFunc: () => {
      dispatch(setStrongestLevel1Id('', -1));
      dispatch(setWeakestLevel1Id('', 2));
    },
    confirmText: 'SAVE',
    confirmFunc: () => {
      dispatch(submitScore());
    },
  };

  const checkboxes = [
    {
      name: 'family-friendly',
      value: familyFriendly,
      label: 'Routine is not family-friendly',
    },
    {
      name: 'i-choreographed',
      value: iChoreographed,
      label: 'I choreographed this routine',
    },
  ];

  function handleChange(e) {
    dispatch(editNotes(e.target.value));
  }

  function scoreTabulator(e, buttons) {
    // Determines strongest and weakest level_1_id categories & returns array of buttons with a non-null grade
    e.preventDefault();
    const categories = {};
    buttons
      .filter((button) => button.good !== null)
      .forEach((button) => {
        if (!categories[button.level_1_id]) {
          categories[button.level_1_id] = {
            good: 0,
            bad: 0,
          };
        }
        categories[button.level_1_id][button.good ? 'good' : 'bad'] += 1;
        const { good, bad } = categories[button.level_1_id];
        categories[button.level_1_id].ratio = good / (good + bad);
      });

    // const strongest = { level_1_id: 0, ratio: 0 };
    // const weakest = { level_1_id: 0, ratio: 1 };
    // Object.entries(categories).forEach(([level_1_id, properties]) => {
    //   if (properties.ratio > strongest.ratio) {
    //     strongest.level_1_id = Number(level_1_id);
    //     strongest.ratio = properties.ratio;
    //   }
    //   if (properties.ratio < weakest.ratio) {
    //     weakest.level_1_id = Number(level_1_id);
    //     weakest.ratio = properties.ratio;
    //   }
    // });

    const sortedCategories = Object.entries(categories)
      .map(([level_1_id, { ratio }]) => ({ level_1_id, ratio }))
      .sort((a, b) => a.ratio - b.ratio);

    dispatch(setStrongestLevel1Id(sortedCategories[0]));
    dispatch(setWeakestLevel1Id(sortedCategories[sortedCategories.length - 1]));
  }

  return (
    <div className="scoring-breakdown-container">
      {popUp && <ScoringBreakdownPopUp />}
      {popUp && <div className="scoring-breakdown-pop-up--divider" />}
      <form
        onSubmit={(e) => {
          dispatch(openModal(new ModalProps(saveProps)));
          scoreTabulator(e, buttonGrades);
        }}
      >
        <div className="scoring-breakdown-header">
          <div className="scoring-breakdown-header-text">Scoring Breakdown</div>
          <IconButton
            icon={infoIcon}
            handleClick={() => dispatch(toggleScoringBreakdownPopUp())}
          />
        </div>
        <div className="score-container">
          <IconButton
            icon={minusIcon}
            handleClick={() => dispatch(minusScore())}
          />
          <span className="score">{score}</span>
          <IconButton
            icon={plusIcon}
            handleClick={() => dispatch(addScore())}
          />
        </div>

        <div className="scoring-breakdown-header">
          <span className="scoring-breakdown-header-text">Add Notes</span>
        </div>
        <textarea
          className="textarea-notes"
          onChange={handleChange}
          value={note}
        />
        {checkboxes.map(({ name, value, label }) => (
          <CustomCheckbox
            key={name}
            name={name}
            label={label}
            handleClick={(e) => dispatch(toggleCheckbox(e))}
            value={value}
          />
        ))}
        <button className="btn btn-submit" type="submit">
          SUBMIT
        </button>
      </form>
      {popUp && (
        <div
          className="modal-background transparent"
          onClick={() => dispatch(toggleScoringBreakdownPopUp())}
          role="alertdialog"
        />
      )}
    </div>
  );
}
