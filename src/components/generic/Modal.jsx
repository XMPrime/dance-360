import React from 'react';
import PropTypes from 'prop-types';

export default function Modal({ header, body, type, cancel, confirm, bgFunc }) {
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
        role="alertdialog"
      />
    </>
  );
}

Modal.propTypes = {
  type: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  cancel: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  confirm: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  bgFunc: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]).isRequired,
};
