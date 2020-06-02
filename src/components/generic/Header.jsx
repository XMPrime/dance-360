import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import JudgeDropdown from '../JudgeDropdown';
import { toggleSideMenu } from '../../redux/scoringReducer';

export default function Header(props) {
  const barsIcon = 'fas fa-bars';
  const crossIcon = 'fas fa-times';
  const dispatch = useDispatch();
  const { displaySideMenu } = useSelector((state) => state.scoring);
  const { title, barIcon } = props;
  return (
    <header>
      <div className="header-text">{title}</div>
      <div className="inner-header">
        <button
          className="header-left-icon"
          onClick={() => dispatch(toggleSideMenu())}
          type="button"
        >
          {barIcon === true ? (
            <i className={displaySideMenu ? crossIcon : barsIcon} />
          ) : (
            <div />
          )}
        </button>
        <JudgeDropdown />
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  barIcon: PropTypes.bool,
};

Header.defaultProps = {
  barIcon: false,
};
