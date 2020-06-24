/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { addButtonGrade } from '../redux/scoringReducer';

export default function Rectangle({
  level_4_id,
  level_1_id,
  isHeader,
  level,
  text,
}) {
  const dispatch = useDispatch();
  const [grade, setGrade] = useState('neutral');
  const { targetRoutineIndex } = useSelector((state) => state.scoring);

  function goodToggle(e) {
    e.preventDefault();
    setGrade(
      {
        good: 'bad',
        bad: 'neutral',
      }[grade] || 'good',
    );

    dispatch(
      addButtonGrade(
        {
          good: { level_4_id, level_1_id, good: false },
          bad: { level_4_id, level_1_id, good: null },
        }[grade] || { level_4_id, level_1_id, good: true },
      ),
    );
  }

  useEffect(() => {
    // Resets Rectangle's grade to neutral if a new routine is rendered
    if (grade !== 'neutral') setGrade('neutral');
  }, [targetRoutineIndex]);

  return (
    <div
      grade={grade}
      className={`rectangle level_${isHeader ? level : 4} ${grade}`}
      onClick={!isHeader ? goodToggle : undefined}
      role="button"
      tabIndex={0}
    >
      {isHeader || <div className="scoring-button-indent" />}
      {text}
    </div>
  );
}

Rectangle.propTypes = {
  level_4_id: PropTypes.number,
  level_1_id: PropTypes.number,
  isHeader: PropTypes.bool.isRequired,
  level: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

Rectangle.defaultProps = {
  level_4_id: 0,
  level_1_id: 0,
};
