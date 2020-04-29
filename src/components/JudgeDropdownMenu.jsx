import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../redux/loginReducer';

export default function JudgeDropdownMenu() {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div className="judge-dropdown-menu">
      <button
        className="judge-dropdown-menu-rectangle"
        onClick={() => history.push('/judge-info')}
        type="button"
      >
        CHANGE JUDGE INFO
      </button>
      <button
        className="judge-dropdown-menu-rectangle"
        onClick={() => dispatch(logout())}
        type="button"
      >
        SIGN OUT
      </button>
    </div>
  );
}
