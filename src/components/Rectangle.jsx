/* eslint-disable camelcase */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
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

  function goodToggle(e) {
    e.preventDefault();
    // TODO do not need switch statement here
    switch (grade) {
      case 'good':
        setGrade('bad');
        dispatch(addButtonGrade({ level_4_id, level_1_id, good: false }));
        break;
      case 'bad':
        setGrade('neutral');
        dispatch(addButtonGrade({ level_4_id, level_1_id, good: null }));
        break;
      default:
        setGrade('good');
        dispatch(addButtonGrade({ level_4_id, level_1_id, good: true }));
        break;
    }
  }

  return (
    <div
      grade={grade}
      className={`rectangle level_${isHeader ? level : 4} ${grade}`}
      onClick={!isHeader && goodToggle}
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
