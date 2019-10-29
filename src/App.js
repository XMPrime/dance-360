import React from "react";
import "./App.css";
import "./index.css";

function App() {
  return (
    <div className='App'>
      <div className='container-fluid'>
        <div className='col-sm'>
          <div className='dropdown'>
            <button
              className='btn btn-secondary dropdown-toggle dropdown-level-one'
              type='button'
              id='dropdownMenuButton'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            >
              Dropdown button
            </button>
            <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
              <a className='dropdown-item dropdown-level-two' href='#'>
                Action
              </a>
              <a className='dropdown-item' href='#'>
                Another action
              </a>
              <a className='dropdown-item' href='#'>
                Something else here
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
