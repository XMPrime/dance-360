import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleLoginModal } from '../redux/loginReducer';

export default function LoginModal() {
  const dispatch = useDispatch();

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === 'Escape') {
      dispatch(toggleLoginModal());
    }
  }

  return (
    <>
      <div className="modal">
        <div className="modal-header">Sorry</div>
        <div className="modal-body">
          You have entered an invalid username or password.
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-purple"
            onClick={() => dispatch(toggleLoginModal())}
            type="button"
          >
            OK
          </button>
        </div>
      </div>
      <div
        className="modal-background"
        onClick={() => dispatch(toggleLoginModal())}
        onKeyDown={(e) => handleKeyDown(e)}
        role="alertdialog"
      />
    </>
  );
}
