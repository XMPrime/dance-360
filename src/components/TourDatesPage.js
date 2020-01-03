import React from "react";
import Header from "../components/Header";
import logo from "../imgs/group-6.svg";
import { Link } from "react-router-dom";

export default function TourDatesPage() {
  const cityArr = [
    { id: 1, name: "St. Louis - December 7-9, 2019" },
    { id: 2, name: "St. Louis - December 7-9, 2019" },
    { id: 3, name: "St. Louis - December 7-9, 2019" }
  ];
  const cityList = cityArr.map(city => {
    return city.id === 1 ? (
      <option className="city-options" selected>
        {city.name}
      </option>
    ) : (
      <option className="city-options">{city.name}</option>
    );
  });

  return (
    <div className="generic-page">
      <Header />
      <div className="tour-dates-menu">
        <img src={logo} className="grid-group-logo" alt="logo" />
        <form className="form-container">
          <select className="custom-select">{cityList}</select>
          <div className="btn-block">
            <button className="btn btn-grey">
              BACK<Link to="/events"></Link>
            </button>

            <button className="btn btn-purple" type="submit">
              NEXT<Link to="/judge-info"></Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
