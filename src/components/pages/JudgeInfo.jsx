import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../generic/Header';
import {
  getJudgesData,
  getCompetitionGroupsData,
  toggleJudgeInfoModal,
  getModalJudgeName,
} from '../../redux/judgeInfoReducer';
import Modal from '../generic/Modal';
import CustomSelect from '../generic/CustomSelect';
import { ModalProps } from '../../utils/models';

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

  // TODO refactor based on custom select
  const selectMenus = [
    { id: 'judge', label: "What is this judge's name?", options: judgesData },
    {
      id: 'position',
      label: 'What position are they?',
      options: [
        { id: 1, position: 1 },
        { id: 2, position: 2 },
        { id: 3, position: 3 },
        { id: 4, position: 4 },
      ],
    },
    {
      id: 'teacher',
      label: 'Is this judge a teacher?',
      options: [
        { id: 1, isTeacher: false, text: 'No' },
        { id: 2, isTeacher: true, text: 'Yes' },
      ],
    },
    {
      id: 'competition',
      label: 'What competition group is this for?',
      options: competitionGroupsData,
    },
  ];

  // TODO refactor for DRY
  const modalProps = {
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

  // TODO convert to async/await
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
      {modal && (
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
          {selectMenus.map((dropdown) => (
            <CustomSelect
              key={dropdown.id}
              id={dropdown.id}
              label={dropdown.label}
              options={dropdown.options}
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
