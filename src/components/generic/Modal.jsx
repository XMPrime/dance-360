import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleModal } from '../../redux/modalsReducer';

export default function Modal({
  header,
  body,
  type,
  cancelText,
  cancelFunc,
  confirmText,
  confirmFunc,
}) {
  const dispatch = useDispatch();

  return (
    <>
      <div className="modal">
        <div className="modal-header">{header}</div>
        <div className="modal-body">
          <div className="modal-text">{body}</div>
        </div>
        <div className="modal-footer">
          {cancelText && (
            <button
              className="btn btn-grey"
              onClick={() => {
                dispatch(toggleModal(type));
                if (cancelFunc) cancelFunc();
              }}
              type="button"
            >
              {cancelText}
            </button>
          )}
          {confirmText && (
            <button
              className="btn btn-purple"
              onClick={() => {
                dispatch(toggleModal(type));
                if (confirmFunc) confirmFunc();
              }}
              type="button"
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
      <div
        className="modal-background"
        onClick={() => dispatch(toggleModal(type))}
        role="alertdialog"
      />
    </>
  );
}

Modal.propTypes = {
  type: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  cancelText: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  cancelFunc: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  confirmText: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  confirmFunc: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
};

Modal.defaultProps = {
  cancelText: '',
  cancelFunc: false,
  confirmText: '',
  confirmFunc: false,
};
