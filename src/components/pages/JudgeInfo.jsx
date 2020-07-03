import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../generic/Header';
import {
  getJudgesData,
  setJudgeInfo,
  getCompetitionGroupsData,
  getModalJudgeName,
  // submitJudgeInfo,
} from '../../redux/judgeInfoReducer';
import { toggleModal } from '../../redux/modalsReducer';
import Modal from '../generic/Modal';
import CustomSelect from '../generic/CustomSelect';
import { ModalProps, CustomSelectProps } from '../../utils/models';
import CONST from '../../utils/constants';

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
      modalFName,
      modalLName,
    },
    { judgeInfoModal },
  ] = useSelector((state) => [state.tourDates, state.judgeInfo, state.modals]);
  const dispatch = useDispatch();

  useEffect(() => {
    Promise.all([
      dispatch(getJudgesData()),
      dispatch(getCompetitionGroupsData()),
    ]);
    // eslint-disable-next-line
  }, []);

  const selectMenus = [
    {
      id: 'judge',
      label: "What is this judge's name?",
      options: judgesData,
      optionText: (option) => `${option.fname} ${option.lname}`,
      handleChange: (e) => {
        const { id, fname, lname, headshot } = judgesData.find(
          (judge) => judge.id === Number(e.target.value),
        );
        dispatch(
          setJudgeInfo({
            judgeId: id,
            judgeFullName: `${fname} ${lname}`,
            judgeHeadshot: headshot,
          }),
        );
      },
    },
    {
      id: 'position',
      label: 'What position are they?',
      options: [
        { id: 1, position: 1 },
        { id: 2, position: 2 },
        { id: 3, position: 3 },
        { id: 4, position: 4 },
      ],
      optionText: (option) => option.position,
      handleChange: (e) => {
        dispatch(setJudgeInfo({ judgePosition: e.target.value }));
      },
    },
    {
      id: 'teacher',
      label: 'Is this judge a teacher?',
      options: [
        { id: 1, isTeacher: false, text: 'No' },
        { id: 2, isTeacher: true, text: 'Yes' },
      ],
      optionText: (option) => (option.isTeacher ? 'Yes' : 'No'),
      handleChange: (e) => {
        dispatch(setJudgeInfo({ judgeIsTeacher: e.target.value }));
      },
    },
    {
      id: 'competition',
      label: 'What competition group is this for?',
      options: competitionGroupsData,
      optionText: (option) => option.name,
      handleChange: (e) => {
        const { id, name } = competitionGroupsData.find(
          (judge) => judge.id === Number(e.target.value),
        );
        dispatch(setJudgeInfo({ judgeGroupName: name, judgeGroupId: id }));
      },
    },
  ];

  const modalProps = {
    type: 'judgeInfo',
    header: 'Alert',
    body: `${modalFName} ${modalLName} already has scores from this position for this tour date. If judges are being swapped, this is fine. Continue?`,
    cancelText: 'CANCEL',
    confirmText: 'OK',
    confirmFunc: () => history.push('/scoring'),
  };

  // TODO convert to async/await
  async function handleSubmit(e) {
    e.preventDefault();
    const url = `${CONST.API}/coda/check-judge`;
    try {
      const response = await axios.get(url, {
        params: {
          tour_date_id: tourDateId,
          competition_group_id: judgeGroupId,
          position: judgePosition,
        },
      });
      const { fname, lname } = response.data;
      if (response.data === '') {
        history.push('/scoring');
        // TODO Toggle some modal saying its missing routine data
      } else {
        dispatch(getModalJudgeName(fname, lname));
        dispatch(toggleModal('judgeInfo'));
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  return (
    <div className="generic-page">
      <Header barIcon={false} title="JUDGE INFORMATION:" />
      {judgeInfoModal && (
        <Modal
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...new ModalProps(modalProps)}
        />
      )}
      <div className="tour-dates-menu">
        <p>JUDGE INFORMATION</p>
        <form
          className="form-container"
          id="judgeInfoForm"
          onSubmit={handleSubmit}
        >
          {selectMenus.map((selectMenu) => (
            <CustomSelect
              key={selectMenu.id}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...new CustomSelectProps(selectMenu)}
            />
          ))}
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
              // onClick={() => dispatch(submitJudgeInfo(history))}
            >
              NEXT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
