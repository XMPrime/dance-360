import React from "react";
import logo from "../imgs/group-6.svg";
// import {  } from "react-router-dom";

export default function EventPage() {
  return (
    <div class="judge-2">
      <header class="header-text">CHOOSE YOUR EVENT:</header>
      <div class="grid">
        <div class="grid-item grid-col-1">
          <img src={logo} class="grid-group-logo" alt="logo" />
        </div>
        <div class="grid-item grid-col-2">
          <img src={logo} class="grid-group-logo" alt="logo" />
        </div>
        <div class="grid-item grid-col-1">
          <img src={logo} class="grid-group-logo" alt="logo" />
        </div>
        <div class="grid-item grid-col-2">
          <img src={logo} class="grid-group-logo" alt="logo" />
        </div>
      </div>
    </div>
  );
}