import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../generic/Header';
import {
  getJudgesData,
  getCompetitionGroupsData,
  setJudgeInfo,
  toggleJudgeInfoModal,
  getModalJudgeName,
} from '../../redux/judgeInfoReducer';
import Modal from '../generic/Modal';

const axios = require('axios');

export default function JudgeInfo() {
  const history = useHistory();
  const [
    { tourDateId },
    {
      competitionGroupsData,
      judgesData,
      judgePosition,
      judgeGroupId,
      modal,
      modalFName,
      modalLName,
    },
  ] = useSelector((state) => [state.tourDates, state.judgeInfo]);
  const dispatch = useDispatch();

  const judgesList = judgesData.map((judge) => {
    return (
      <option
        key={judge.id}
        id={judge.id}
        className="tour-dates"
        name="fullName"
        value={`${judge.fname} ${judge.lname}`}
      >
        {`${judge.fname} ${judge.lname}`}
      </option>
    );
  });
  const positionsList = [1, 2, 3, 4].map((position) => {
    return (
      <option
        key={position}
        className="tour-dates"
        name="position"
        value={position}
      >
        {position}
      </option>
    );
  });
  const isTeacherList = ['No', 'Yes'].map((isTeacher) => {
    return (
      <option
        key={isTeacher}
        className="tour-dates"
        name="position"
        value={isTeacher === 'Yes' && true}
      >
        {isTeacher}
      </option>
    );
  });
  const competitionGroupsList = competitionGroupsData.map((group) => {
    return (
      <option
        key={group.id}
        id={group.id}
        className="tour-dates"
        name="groupName"
        value={group.name}
      >
        {group.name}
      </option>
    );
  });

  const dropdowns = [
    { id: 'judge', label: "What is this judge's name?", options: judgesList },
    {
      id: 'position',
      label: 'What position are they?',
      options: positionsList,
    },
    {
      id: 'teacher',
      label: 'Is this judge a teacher?',
      options: isTeacherList,
    },
    {
      id: 'competition',
      label: 'What competition group is this for?',
      options: competitionGroupsList,
    },
  ];

  const alert = {
    type: 'alert',
    header: 'Alert',
    body: `${modalFName} ${modalLName} already has scores from this position for this tour date. If judges are being swapped, this is fine. Continue?`,
    cancel: {
      text: 'CANCEL',
      func: (e) => dispatch(toggleJudgeInfoModal(e)),
    },
    confirm: {
      text: 'OK',
      func: (e) => {
        dispatch(toggleJudgeInfoModal(e));
        history.push('/scoring');
      },
    },
    bgFunc: (e) => dispatch(toggleJudgeInfoModal(e)),
  };

  function handleFormChange(e) {
    const { id, value } = e.target;

    switch (id) {
      case 'judge': {
        const index = document.getElementById('judge').selectedIndex;
        dispatch(setJudgeInfo('judgeFullName', value));
        dispatch(setJudgeInfo('judgeHeadshot', judgesData[index].headshot));
        dispatch(setJudgeInfo('judgeId', judgesData[index].id));
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
        const groupId = competitionElem.options[index].id;
        dispatch(setJudgeInfo('judgeGroupName', value));
        dispatch(setJudgeInfo('judgeGroupId', groupId));
        break;
      }
      default:
        // eslint-disable-next-line no-console
        console.log('error');
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const url = 'https://api.d360test.com/api/coda/check-judge';

    axios
      .get(url, {
        params: {
          tour_date_id: tourDateId,
          competition_group_id: judgeGroupId,
          position: judgePosition,
        },
      })
      .then((response) => {
        const { fname } = response.data;
        const { lname } = response.data;

        if (response.data === '') {
          history.push('/scoring');
        } else {
          dispatch(getModalJudgeName(fname, lname));
          dispatch(toggleJudgeInfoModal());
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }

  useEffect(() => {
    Promise.all([
      dispatch(getJudgesData()),
      dispatch(getCompetitionGroupsData()),
    ]);
    // eslint-disable-next-line
  }, []);
  return (
    <div className="generic-page">
      <Header barIcon={false} title="JUDGE INFORMATION:" />
      {modal ? (
        <Modal
          type={alert.type}
          header={alert.header}
          body={alert.body}
          cancel={alert.cancel}
          confirm={alert.confirm}
          bgFunc={alert.bgFunc}
        />
      ) : null}
      <div className="tour-dates-menu">
        <p>JUDGE INFORMATION</p>
        <form
          className="form-container"
          id="judgeInfoForm"
          onSubmit={handleSubmit}
        >
          {dropdowns.map((dropdown) => {
            return (
              <div key={dropdown.id} className="label-container">
                <label className="custom-label" htmlFor={`${dropdown.id}`}>
                  {dropdown.label}
                  <select
                    className="custom-select"
                    id={`${dropdown.id}`}
                    onChange={handleFormChange}
                  >
                    {dropdown.options}
                  </select>
                </label>
              </div>
            );
          })}
          <div className="btn-block">
            <button
              className="btn btn-grey"
              onClick={() => history.push('/tour-dates')}
              type="button"
            >
              BACK
            </button>

            <button
              className="btn btn-purple"
              type="submit"
              onClick={() => handleSubmit}
            >
              NEXT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
