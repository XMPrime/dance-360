import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import anonymousJudge from '../imgs/default.png';
import { toggleJudgeDropdown } from '../redux/judgeDropdownReducer';
import JudgeDropdownMenu from './JudgeDropdownMenu';
import { caretDownIcon } from '../utils/constants';

export default function JudgeDropdown() {
  const dispatch = useDispatch();
  // TODO combine useSelector
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
        {/* TODO when doing conditional strings, use DRY */}

        {judgePosition && `${`#${judgePosition} `}${judgeFullName}`}
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
