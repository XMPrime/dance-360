import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toggleJudgeInfoModal } from '../../redux/judgeInfoReducer';

export default function JudgeInfoModal() {
  const history = useHistory();
  const { fname, lname } = useSelector((state) => state.judgeInfo.modalState);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="modal">
        <div className="modal-header">Alert</div>
        <div className="modal-body">
          <div className="modal-text">
            {`${fname} ${lname} already has scores from this position for this tour date.
          If judges are being swapped, this is fine. Continue?`}
          </div>
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-grey"
            onClick={() => dispatch(toggleJudgeInfoModal())}
            type="button"
          >
            CANCEL
          </button>
          <button
            className="btn btn-purple"
            onClick={() => {
              dispatch(toggleJudgeInfoModal());
              history.push('/scoring');
            }}
            type="button"
          >
            YES
          </button>
        </div>
      </div>
      <div
        className="modal-background"
        onClick={() => dispatch(toggleJudgeInfoModal())}
        role="alertdialog"
      />
    </div>
  );
}
