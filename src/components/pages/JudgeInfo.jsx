import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useForm from 'react-hook-form';
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
import { findById } from '../../utils/helperFunctions';

const axios = require('axios');

export default function JudgeInfo() {
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [
    { tourDateId },
    {
      competitionGroupsData,
      judgesData,
      judgeId,
      judgePosition,
      judgeIsTeacher,
      judgeGroupId,
      modalFName,
      modalLName,
    },
    { judgeInfoModal },
  ] = useSelector((state) => [state.tourDates, state.judgeInfo, state.modals]);
  // const [defaultJudge, setDefaultJudge] = useState(judgeId);
  // const [defaultJudgePosition, setDefaultJudgePosition] = useState(
  //   judgePosition,
  // );
  // const [defaultJudgeIsTeacher, setDefaultJudgeIsTeacher] = useState(
  //   judgeIsTeacher ? 2 : 1,
  // );
  // const [defaultJudgeCompGroup, setDefaultJudgeCompGroup] = useState(
  //   judgeGroupId,
  // );

  const [
    [defaultJudge, setDefaultJudge],
    [defaultJudgePosition, setDefaultJudgePosition],
    [defaultJudgeIsTeacher, setDefaultJudgeIsTeacher],
    [defaultJudgeCompGroup, setDefaultJudgeCompGroup],
  ] = [
    useState(judgeId),
    useState(judgePosition),
    useState(judgeIsTeacher ? 2 : 1),
    useState(judgeGroupId),
  ];

  useEffect(() => {
    Promise.all([
      dispatch(getJudgesData()),
      dispatch(getCompetitionGroupsData()),
    ]);
    // eslint-disable-next-line
  }, []);

  const positionOptions = [
    { id: 1, position: 1 },
    { id: 2, position: 2 },
    { id: 3, position: 3 },
    { id: 4, position: 4 },
  ];

  const isTeacherOptions = [
    { id: 1, isTeacher: false },
    { id: 2, isTeacher: true },
  ];

  const selectMenus = [
    {
      id: 'judge',
      label: "What is this judge's name?",
      options: judgesData,
      optionText: (option) => `${option.fname} ${option.lname}`,
      changeFunc: setDefaultJudge,
      defaultOption: defaultJudge,
    },
    {
      id: 'position',
      label: 'What position are they?',
      options: positionOptions,
      optionText: (option) => option.position,
      changeFunc: setDefaultJudgePosition,
      defaultOption: defaultJudgePosition,
    },
    {
      id: 'teacher',
      label: 'Is this judge a teacher?',
      options: isTeacherOptions,
      optionText: (option) => (option.isTeacher ? 'Yes' : 'No'),
      changeFunc: setDefaultJudgeIsTeacher,
      defaultOption: defaultJudgeIsTeacher,
    },
    {
      id: 'competition',
      label: 'What competition group is this for?',
      options: competitionGroupsData,
      optionText: (option) => option.name,
      changeFunc: setDefaultJudgeCompGroup,
      defaultOption: defaultJudgeCompGroup,
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
  async function checkJudge(position, competition) {
    const url = `${CONST.API}/coda/check-judge`;
    try {
      const response = await axios.get(url, {
        params: {
          tour_date_id: tourDateId,
          competition_group_id: competition,
          position,
        },
      });
      const { fname, lname } = response.data;
      if (response.data === '') {
        history.push('/scoring');
      } else {
        dispatch(getModalJudgeName(fname, lname));
        dispatch(toggleModal('judgeInfo'));
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  function onSubmit({ judge, position, teacher, competition }) {
    const [{ fname, lname }, { name }, { isTeacher }] = [
      findById(judgesData, judge),
      findById(competitionGroupsData, competition),
      findById(isTeacherOptions, teacher),
    ];

    dispatch(
      setJudgeInfo({
        judgeId: Number(judge),
        judgeFullName: `${fname} ${lname}`,
        judgePosition: Number(position),
        judgeIsTeacher: isTeacher,
        judgeGroupId: Number(competition),
        judgeGroupName: name,
      }),
    );

    // TODO? dispatch not instantly updating state
    checkJudge(Number(position), Number(competition));
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
          onSubmit={handleSubmit(onSubmit)}
        >
          {selectMenus.map((selectMenu) => (
            <CustomSelect
              key={selectMenu.id}
              register={register}
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
