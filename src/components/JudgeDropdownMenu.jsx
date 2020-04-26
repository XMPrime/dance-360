import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/loginReducer';
import { useHistory } from 'react-router-dom';

export default function JudgeDropdownMenu() {
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <div className="judge-dropdown-menu">
      <div
        className="judge-dropdown-menu-rectangle"
        onClick={() => history.push('/judge-info')}
      >
        CHANGE JUDGE INFO
      </div>
      <div
        className="judge-dropdown-menu-rectangle"
        onClick={() => dispatch(logout())}
      >
        SIGN OUT
      </div>
    </div>
  );
}
