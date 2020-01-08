import React, { useEffect, useContext } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { JudgeContext } from "../JudgeContext";
import history from "../history";

export default function JudgeInfo() {
  const axios = require("axios");
  const {
    judgesData,
    setJudgesData,
    competitionGroupsData,
    setCompetitionGroupsData,
    isLoggedIn
  } = useContext(JudgeContext);
  const judgesList = judgesData.map(judge => {
    return (
      <option
        key={judge.id}
        className="tour-dates"
        value={[judge.fname, judge.lname]}
      >
        {`${judge.fname} ${judge.lname}`}
      </option>
    );
  });
  const positionsList = [1, 2, 3, 4].map(position => {
    return (
      <option key={position} className="tour-dates" value={position}>
        {position}
      </option>
    );
  });
  const competitionGroupsList = competitionGroupsData.map(group => {
    return (
      <option key={group.id} className="tour-dates" value={group.name}>
        {group.name}
      </option>
    );
  });

  function handleSubmit() {
    console.log(isLoggedIn);
    history.push("/scoring");
  }

  useEffect(() => {
    axios.get("https://api.d360test.com/api/coda/judges").then(response => {
      setJudgesData(response.data);
    });

    axios
      .get("https://api.d360test.com/api/coda/competition-groups")
      .then(response => {
        setCompetitionGroupsData(response.data);
      });
  }, []); // empty array makes it run only once

  return (
    <div className="generic-page">
      <Header barIcon={false} title="JUDGE INFORMATION:" />
      <div className="tour-dates-menu">
        <p>JUDGE INFORMATION</p>
        <form className="form-container" id="judgeInfoForm">
          <div className="label-container">
            <label className="custom-label" htmlFor="judge">
              What is this judge's name?
            </label>
          </div>

          <select className="custom-select" id="judge">
            {judgesList}
          </select>
          <div className="label-container">
            <label className="custom-label" htmlFor="position">
              What position are they?
            </label>
          </div>
          <select className="custom-select" id="position">
            {positionsList}
          </select>
          <div className="label-container">
            <label className="custom-label" htmlFor="teacher">
              Is the judge also a teacher?
            </label>
          </div>
          <select className="custom-select" id="teacher">
            <option className="tour-dates" value={true}>
              Yes
            </option>
            <option className="tour-dates" value={false}>
              No
            </option>
          </select>
          <div className="label-container">
            <label className="custom-label" htmlFor="competition">
              What competition group is this for?
            </label>
          </div>

          <select className="custom-select" id="competition">
            {competitionGroupsList}
          </select>
          <div className="btn-block">
            <Link to="/tour-dates">
              <button className="btn btn-grey">BACK</button>
            </Link>
            <button
              className="btn btn-purple"
              type="submit"
              onClick={handleSubmit}
            >
              NEXT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
