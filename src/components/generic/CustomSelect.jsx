import React from 'react';
import PropTypes from 'prop-types';

export default function CustomSelect({
  id,
  label,
  options,
  optionText,
  handleChange,
}) {
  return (
    <div
      className="label-container"
      style={!label ? { marginTop: 0, marginBottom: 0 } : {}}
    >
      {label && (
        <label className="custom-label" htmlFor={id}>
          {label}
        </label>
      )}
      <select className="custom-select" id={id} onChange={handleChange}>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {optionText(option)}
          </option>
        ))}
      </select>
    </div>
  );
}

CustomSelect.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  optionText: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

CustomSelect.defaultProps = {
  label: '',
};
