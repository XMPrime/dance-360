import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import JudgeDropdown from '../JudgeDropdown';
import { toggleSideMenu } from '../../redux/scoringReducer';
import { barsIcon, crossIcon } from '../../utils/constants';

export default function Header(props) {
  const dispatch = useDispatch();
  const { displaySideMenu } = useSelector((state) => state.scoring);
  // TODO instead of creating new variables, destructure directly in the arguments of function
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
            // TODO create icon component
            <i className={displaySideMenu ? crossIcon : barsIcon} />
          ) : (
            // TODO fix empty divs / hacky divs
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
