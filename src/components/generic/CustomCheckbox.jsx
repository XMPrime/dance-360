import React from 'react';
import PropTypes from 'prop-types';

export default function CustomCheckbox({ name, label, handleClick, value }) {
  return (
    <div className="checkbox-container">
      <input
        className="checkbox-style"
        type="checkbox"
        name={name}
        onClick={handleClick}
        value={value}
      />
      <div className="checkbox-label-style">{label}</div>
    </div>
  );
}

CustomCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
};
