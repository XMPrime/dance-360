import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import anonymousJudge from '../imgs/default_profile_pic.png';
import { toggleJudgeDropdown } from '../redux/judgeDropdownReducer';
import JudgeDropdownMenu from './JudgeDropdownMenu';

export default function JudgeDropdown() {
  const dispatch = useDispatch();
  const { judgePosition, judgeFullName, judgeHeadshot } = useSelector(
    (state) => state.judgeInfo,
  );
  const judgeDropdownIsOpen = useSelector(
    (state) => state.judgeDropdown.isOpen,
  );
  return (
    <nav
      className="judge-dropdown"
      onClick={() => dispatch(toggleJudgeDropdown())}
    >
      <div className="judge-id-name">
        {judgePosition
          ? `#${judgePosition} ${judgeFullName}`
          : `${judgeFullName}`}
      </div>
      <img
        className="profile-pic"
        src={
          judgeHeadshot
            ? `https://assets.dance360.com/staff/50x50/${judgeHeadshot}`
            : anonymousJudge
        }
        alt="your profile pic"
      />
      <i className="fas fa-caret-down" />
      {judgeDropdownIsOpen ? <JudgeDropdownMenu /> : null}
    </nav>
  );
}
