import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useForm from 'react-hook-form';
import Header from '../generic/Header';
import {
  getJudgesData,
  setJudgeInfo,
  getCompetitionGroupsData,
} from '../../redux/judgeInfoReducer';
import { openModal } from '../../redux/modalsReducer';
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
    },
  ] = useSelector((state) => [state.tourDates, state.judgeInfo]);

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

  // 1. onsubmit is run
  // 2. dispatch data
  // 3. check judge
  // 4. if judge doesnt exist, go to scoring page
  // 5. if judge exists, show modal
  // 6. if modal is confirmed, go to scoring page

  // 1. onsubmit is run
  // 2. check judge
  // 3. if judge exists, then show modal
  // 4. if doesnt exist or modal is confirmed, then dispatch data and go to scoring page

  // eslint-disable-next-line consistent-return
  async function checkJudge(position, competition) {
    try {
      const url = `${CONST.API}/coda/check-judge`;
      const { data: response } = await axios.get(url, {
        params: {
          tour_date_id: tourDateId,
          competition_group_id: competition,
          position,
        },
      });
      if (!response) return true;

      const { fname, lname } = response;
      const modalProps = {
        type: 'judgeInfo',
        header: 'Alert',
        body: `${fname} ${lname} already has scores from this position for this tour date. If judges are being swapped, this is fine. Continue?`,
        cancelText: 'CANCEL',
        confirmText: 'OK',
        confirmFunc: () => history.push('/scoring'),
      };

      dispatch(openModal(new ModalProps(modalProps)));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  async function onSubmit({ judge, position, teacher, competition }) {
    const confirmed = await checkJudge(Number(position), Number(competition));
    if (!confirmed) return;

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
    history.push('/scoring');
  }

  return (
    <div className="generic-page">
      <Header barIcon={false} title="JUDGE INFORMATION:" />
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

            <button className="btn btn-purple" type="submit">
              NEXT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
