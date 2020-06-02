import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { toggleModal } from '../redux/loginReducer';

export default function LoginModal(props) {
  const dispatch = useDispatch();
  const { header, body, type } = props;

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === 'Escape') {
      dispatch(toggleModal());
    }
  }

  return (
    <>
      <div className="modal">
        <div className="modal-header">{header}</div>
        <div className="modal-body">{body}</div>
        <div className="modal-footer">
          <button
            id={type}
            className="btn btn-purple"
            onClick={(e) => dispatch(toggleModal(e))}
            type="button"
          >
            OK
          </button>
        </div>
      </div>
      <div
        id={type}
        className="modal-background"
        onClick={(e) => dispatch(toggleModal(e))}
        onKeyDown={(e) => handleKeyDown(e)}
        role="alertdialog"
      />
    </>
  );
}

LoginModal.propTypes = {
  type: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};
