/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { addButtonGrade } from '../redux/scoringReducer';

const GRADE = {
  GOOD: true,
  BAD: false,
  NEUTRAL: null,
};

export default function Rectangle({
  level_4_id,
  level_1_id,
  isHeader,
  level,
  text,
}) {
  const dispatch = useDispatch();
  const [grade, setGrade] = useState(GRADE.NEUTRAL);
  const { targetRoutineIndex } = useSelector((state) => state.scoring);

  const getNextGrade = (currentGrade) =>
    ({
      [GRADE.NEUTRAL]: GRADE.GOOD,
      [GRADE.GOOD]: GRADE.BAD,
      [GRADE.BAD]: GRADE.NEUTRAL,
    }[currentGrade]);

  const getColor = (currentGrade) =>
    ({
      [GRADE.NEUTRAL]: 'neutral',
      [GRADE.GOOD]: 'good',
      [GRADE.BAD]: 'bad',
    }[currentGrade]);

  function goodToggle(e) {
    e.preventDefault();
    if (isHeader) return;
    const nextGrade = getNextGrade(grade);
    setGrade(nextGrade);

    dispatch(
      addButtonGrade({
        level_4_id,
        level_1_id,
        good: nextGrade,
      }),
    );
  }

  useEffect(() => {
    // Resets Rectangle's grade to neutral if a new routine is rendered
    if (grade !== GRADE.NEUTRAL) setGrade(GRADE.NEUTRAL);
    // eslint-disable-next-line
  }, [targetRoutineIndex]);

  return (
    <div
      className={`rectangle level_${isHeader ? level : 4} ${getColor(grade)}`}
      onClick={goodToggle}
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
