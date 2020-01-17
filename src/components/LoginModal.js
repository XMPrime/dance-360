import React from "react";

export default function LoginModal() {
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <div className="btn-block">
                <button className="btn btn-grey">BACK</button>
                <button className="btn btn-purple" type="submit">
                  NEXT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
