import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/modalsReducer';

export default function Modal() {
  const [
    {
      show,
      props: {
        type,
        header,
        body,
        cancelText,
        cancelFunc,
        confirmText,
        confirmFunc,
      },
    },
  ] = useSelector((state) => [state.modals]);
  const dispatch = useDispatch();

  return (
    show && (
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
                  dispatch(closeModal(type, false));
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
                  dispatch(closeModal(type, true));
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
          onClick={() => dispatch(closeModal(type, false))}
          role="alertdialog"
        />
      </>
    )
  );
}

// Modal.propTypes = {
//   type: PropTypes.string.isRequired,
//   header: PropTypes.string.isRequired,
//   body: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
//   cancelText: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
//   cancelFunc: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
//   confirmText: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
//   confirmFunc: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
// };

// Modal.defaultProps = {
//   cancelText: '',
//   cancelFunc: false,
//   confirmText: '',
//   confirmFunc: false,
// };
