import React from 'react';
import PropTypes from 'prop-types';

export default function Modal(props) {
  const { header, body, type, cancel, confirm, bgFunc } = props;

  //   function handleKeyDown(e) {
  //     if (e.key === 'Enter' || e.key === 'Escape') {
  //       dispatch(toggleModal());
  //     }
  //   }

  return (
    <>
      <div className="modal">
        <div className="modal-header">{header}</div>
        <div className="modal-body">
          <div className="modal-text">{body}</div>
        </div>
        <div className="modal-footer">
          {cancel && (
            <button
              id={type}
              className="btn btn-grey"
              onClick={cancel.func}
              type="button"
            >
              {cancel.text}
            </button>
          )}
          {confirm && (
            <button
              id={type}
              className="btn btn-purple"
              onClick={confirm.func}
              type="button"
            >
              {confirm.text}
            </button>
          )}
        </div>
      </div>
      <div
        id={type}
        className="modal-background"
        onClick={bgFunc}
        // onKeyDown={(e) => handleKeyDown(e)}
        role="alertdialog"
      />
    </>
  );
}

Modal.propTypes = {
  type: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};
