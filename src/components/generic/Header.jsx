import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import JudgeDropdown from '../JudgeDropdown';
import { toggleSideMenu } from '../../redux/scoringReducer';
import { barsIcon, crossIcon } from '../../utils/constants';

export default function Header({ title, barIcon }) {
  const dispatch = useDispatch();
  const { displaySideMenu } = useSelector((state) => state.scoring);
  return (
    <header>
      <div className="header-text">{title}</div>
      <div className="inner-header">
        <button
          className="header-left-icon"
          onClick={() => dispatch(toggleSideMenu())}
          type="button"
        >
          {barIcon && <i className={displaySideMenu ? crossIcon : barsIcon} />}
        </button>
        <JudgeDropdown />
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  barIcon: PropTypes.bool,
};

Header.defaultProps = {
  barIcon: false,
};
