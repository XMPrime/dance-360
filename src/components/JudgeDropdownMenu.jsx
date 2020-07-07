import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../redux/loginReducer';

export default function JudgeDropdownMenu() {
  const history = useHistory();
  const dispatch = useDispatch();

  const buttons = [
    {
      text: 'SIGN OUT',
      clickFunction: () => dispatch(logout()),
    },
  ];

  return (
    <div className="judge-dropdown-menu">
      {history.location.pathname === '/scoring' && (
        <button
          className="judge-dropdown-menu-rectangle"
          onClick={() => history.push('/judge-info')}
          type="button"
        >
          CHANGE JUDGE INFO
        </button>
      )}
      {buttons.map(({ text, clickFunction }) => (
        <button
          key={text}
          className="judge-dropdown-menu-rectangle"
          onClick={clickFunction}
          type="button"
        >
          {text}
        </button>
      ))}
    </div>
  );
}
