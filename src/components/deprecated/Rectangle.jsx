/* eslint-disable camelcase */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Rectangle({
  level_4_id,
  level_1_id,
  isHeader,
  level,
  text,
}) {
  const [grade, setGrade] = useState('neutral');

  return (
    <div
      level_4_id={level_4_id}
      level_1_id={level_1_id}
      grade={grade}
      className={`rectangle level_${isHeader ? level : 4} ${grade}`}
      onClick={
        !isHeader &&
        setGrade(
          {
            good: 'bad',
            bad: 'neutral',
          }[grade] || 'good',
        )
      }
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
