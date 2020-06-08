import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../redux/loginReducer';

export default function JudgeDropdownMenu() {
  const history = useHistory();
  const dispatch = useDispatch();

  const buttons = [
    {
      text: 'CHANGE JUDGE INFO',
      clickFunction: () => history.push('/judge-info'),
    },
    {
      text: 'SIGN OUT',
      clickFunction: () => dispatch(logout()),
    },
  ];

  return (
    <div className="judge-dropdown-menu">
      {buttons.map((button) => {
        // TODO turn into implicit return + destructure props
        return (
          <button
            key={button.text}
            className="judge-dropdown-menu-rectangle"
            onClick={button.clickFunction}
            type="button"
          >
            {button.text}
          </button>
        );
      })}
    </div>
  );
}
