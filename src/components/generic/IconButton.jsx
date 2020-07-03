import React from 'react';
import PropTypes from 'prop-types';

export default function IconButton({ icon, handleClick }) {
  return (
    <button onClick={handleClick} type="button">
      <i className={icon} />
    </button>
  );
}

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
