import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setJudgeInfo } from '../../redux/judgeInfoReducer';

export default function CustomSelect({ id, label, options }) {
  const dispatch = useDispatch();

  function handleFormChange(e) {
    const selectedOption = options[e.target.selectedIndex];
    dispatch(
      setJudgeInfo(
        {
          judge: {
            judgeFullName: `${selectedOption.fname} ${selectedOption.lname}`,
            judgeHeadshot: selectedOption.headshot,
            judgeId: selectedOption.key,
          },
          position: { judgePosition: selectedOption.position },
          teacher: { judgeIsTeacher: selectedOption.isTeacher },
          competition: {
            judgeGroupName: selectedOption.name,
            judgeGroupId: selectedOption.id,
          },
        }[id],
      ),
    );
  }

  function determineOptionText({ fname, lname, name, text, position }) {
    if (fname) return `${fname} ${lname}`;
    if (name) return name;
    if (text) return text;
    return position;
  }

  return (
    <div className="label-container">
      <label className="custom-label" htmlFor={`${id}`}>
        {label}
      </label>
      <select
        className="custom-select"
        id={`${id}`}
        onChange={handleFormChange}
      >
        {options.map((option) => (
          <option key={option.id}>{determineOptionText(option)}</option>
        ))}
      </select>
    </div>
  );
}

CustomSelect.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};
