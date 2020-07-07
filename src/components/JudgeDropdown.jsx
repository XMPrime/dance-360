import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import anonymousJudge from '../imgs/default.png';
import { toggleJudgeDropdown } from '../redux/judgeDropdownReducer';
import JudgeDropdownMenu from './JudgeDropdownMenu';
import { caretDownIcon } from '../utils/constants';

export default function JudgeDropdown() {
  const dispatch = useDispatch();
  const [
    { judgePosition, judgeFullName, judgeHeadshot },
    judgeDropdownIsOpen,
  ] = useSelector((state) => [state.judgeInfo, state.judgeDropdown.isOpen]);

  return (
    <nav
      className="judge-dropdown"
      onClick={() => dispatch(toggleJudgeDropdown())}
    >
      <div className="judge-id-name">
        {judgePosition ? `#${judgePosition} ${judgeFullName}` : judgeFullName}
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
      <i className={caretDownIcon} />
      {judgeDropdownIsOpen && <JudgeDropdownMenu />}
    </nav>
  );
}
