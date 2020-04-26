import React from 'react';
import { toggleLoginModal } from '../redux/loginReducer';
import { useDispatch } from 'react-redux';

export default function LoginModal() {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="modal">
        <div className="modal-header">Sorry</div>
        <div className="modal-body">
          You have entered an invalid username or password.
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-purple"
            onClick={() => dispatch(toggleLoginModal())}
          >
            OK
          </button>
        </div>
      </div>
      <div
        className="modal-background"
        onClick={() => dispatch(toggleLoginModal())}
      ></div>
    </div>
  );
}
