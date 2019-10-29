import React from "react";
import "./App.css";
import "./index.css";

function App2() {
  return (
    <div className='App'>
      <div className='dropdown'>
        <button onclick={myFunction()} class='dropbtn'>
          Dropdown
        </button>
        <div id='myDropdown' className='dropdown-content'>
          <a href='#'>Link 1</a>
          <a href='#'>Link 2</a>
          <a href='#'>Link 3</a>
        </div>
      </div>
    </div>
  );
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

export default App2;
