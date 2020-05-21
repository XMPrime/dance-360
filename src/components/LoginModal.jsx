import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { toggleModal } from '../redux/loginReducer';

export default function LoginModal(props) {
  const dispatch = useDispatch();
  const { header, linkText, linkAddress, body1, body2, type } = props;

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === 'Escape') {
      dispatch(toggleModal());
    }
  }

  return (
    <>
      <div className="modal">
        <div className="modal-header">{header}</div>
        <div className="modal-body">
          {body1}
          <a href={linkAddress}>{linkText}</a>
          {body2}
        </div>
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
  linkText: PropTypes.string,
  linkAddress: PropTypes.string,
  body1: PropTypes.string.isRequired,
  body2: PropTypes.string,
};

LoginModal.defaultProps = {
  linkText: '',
  linkAddress: '',
  body2: '',
};
