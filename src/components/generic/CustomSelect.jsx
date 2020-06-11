import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setJudgeInfo } from '../../redux/judgeInfoReducer';

export default function CustomSelect({ id, label, options }) {
  const { judgesData } = useSelector((state) => state.judgeInfo);
  const dispatch = useDispatch();

  function handleFormChange(e) {
    const { id, value } = e.target;

    switch (id) {
      case 'judge': {
        const index = document.getElementById('judge').selectedIndex;
        dispatch(setJudgeInfo('judgeFullName', value));
        dispatch(setJudgeInfo('judgeHeadshot', judgesData[index].headshot));
        dispatch(setJudgeInfo('judgeId', judgesData[index].key));
        break;
      }
      case 'position':
        dispatch(setJudgeInfo('judgePosition', value));
        break;
      case 'teacher':
        dispatch(setJudgeInfo('judgeIsTeacher', value));
        break;
      case 'competition': {
        const competitionElem = document.getElementById('competition');
        const index = competitionElem.selectedIndex;
        const groupId = competitionElem[index].id;
        dispatch(setJudgeInfo('judgeGroupName', value));
        dispatch(setJudgeInfo('judgeGroupId', groupId));
        break;
      }
      default:
        // eslint-disable-next-line no-console
        console.log('error');
    }
  }

  return (
    <div className="label-container">
      <label className="custom-label" htmlFor={`${id}`}>
        {label}
      </label>
      <select
        className="custom-select"
        id={`${id}`}
        onChange={handleFormChange}
      >
        {options.map((option) => {
          // 'judge position teacher competition'
          switch (id) {
            case 'judge':
              return (
                <option
                  key={option.id}
                  value={`${option.fname} ${option.lname}`}
                >
                  {`${option.fname} ${option.lname}`}
                </option>
              );
            case 'teacher':
              return (
                <option key={option} value={option}>
                  {option ? 'Yes' : 'No'}
                </option>
              );
            case 'competition':
              return (
                <option key={option.id} id={option.id} value={option.name}>
                  {option.name}
                </option>
              );
            default:
              // 'position'
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
          }
        })}
      </select>
    </div>
  );
}
