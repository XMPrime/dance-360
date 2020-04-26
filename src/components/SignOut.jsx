import React from "react";

export default function SignOut() {
  return (
    <div className="sign-out-container">
      <div>Are you sure you want to sign out?</div>
      <button className="btn btn-grey">CANCEL</button>

      <button className="btn btn-purple" type="submit">
        SIGN OUT
      </button>
    </div>
  );
}
