import React, { useEffect, useContext } from "react";
import Header from "../components/Header";
// import { JudgeContext } from "../JudgeContext";
import { useSelector, useDispatch } from "react-redux";
import {
  setJudgesData,
  setCompetitionGroupsData,
  setJudgeFullName,
  setJudgePosition,
  setJudgeIsTeacher,
  setJudgeGroupName,
  setJudgeGroupId,
  setJudgeHeadshot,
  toggleJudgeInfoModal,
  getModalJudgeName
} from "../redux/judgeInfoReducer";
import JudgeInfoModal from "./JudgeInfoModal";
import history from "../history";

export default function JudgeInfo() {
  const tourDateId = useSelector(state => state.tourDates.tourDateId);
  const {
    competitionGroupsData,
    judgesData,
    judgePosition,
    judgeGroupId,
    modal
  } = useSelector(state => state.judgeInfo);
  const dispatch = useDispatch();
  const axios = require("axios");

  const judgesList = judgesData.map(judge => {
    return (
      <option
        key={judge.id}
        id={judge.id}
        className="tour-dates"
        name="fullName"
        headshot={69}
        value={`${judge.fname} ${judge.lname}`}
      >
        {`${judge.fname} ${judge.lname}`}
      </option>
    );
  });
  const positionsList = [1, 2, 3, 4].map(position => {
    return (
      <option
        key={position}
        className="tour-dates"
        name="position"
        value={position}
      >
        {position}
      </option>
    );
  });
  const competitionGroupsList = competitionGroupsData.map(group => {
    return (
      <option
        key={group.id}
        id={group.id}
        className="tour-dates"
        name="groupName"
        value={group.name}
      >
        {group.name}
      </option>
    );
  });

  function handleFormChange(e) {
    const name = e.target.id;
    const value = e.target.value;

    switch (name) {
      case "judge":
        const index = document.getElementById("judge").selectedIndex;
        dispatch(setJudgeFullName(value));
        dispatch(setJudgeHeadshot(judgesData[index].headshot));
        break;
      case "position":
        dispatch(setJudgePosition(value));
        break;
      case "teacher":
        dispatch(setJudgeIsTeacher(value));
        break;
      case "competition":
        const competitionElem = document.getElementById("competition");
        const groupId =
          competitionElem.options[competitionElem.selectedIndex].id;
        dispatch(setJudgeGroupName(value));
        dispatch(setJudgeGroupId(groupId));
        break;
      default:
        console.log("error");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(tourDateId, judgeGroupId, judgePosition);
    const url = "https://api.d360test.com/api/coda/check-judge";
    axios
      .get(url, {
        params: {
          tour_date_id: tourDateId,
          competition_group_id: 2, //judgeGroupId
          position: judgePosition
        }
      })
      .then(response => {
        let fname = response.data.fname;
        let lname = response.data.lname;

        if (response.data === "") {
          history.push("/scoring");
        } else {
          dispatch(getModalJudgeName(fname, lname));
          dispatch(toggleJudgeInfoModal());
        }
      });
  }

  useEffect(() => {
    axios.get("https://api.d360test.com/api/coda/judges").then(response => {
      console.log(response.data);
      dispatch(setJudgesData(response.data));

      //Defaults value of Judge's name on load. See comment below for reason.
      dispatch(
        setJudgeFullName(`${response.data[0].fname} ${response.data[0].lname}`)
      );
    });

    axios
      .get("https://api.d360test.com/api/coda/competition-groups")
      .then(response => {
        dispatch(setCompetitionGroupsData(response.data));

        //Sets the default values on load of JudgeInfo page because the header needs
        //to start as "Anonymous" without position # nor judge picture displayed
        dispatch(setJudgePosition(1)); //defaulted to 1 as it is at the top of the positions list
        dispatch(setJudgeGroupId(response.data[0].id));
      });

    // why dis no work? document.getElementById("judge").value
  }, []); // empty array makes it run only once
  return (
    <div className="generic-page">
      <Header barIcon={false} title="JUDGE INFORMATION:" />
      {modal ? <JudgeInfoModal /> : null}
      <div className="tour-dates-menu">
        <p>JUDGE INFORMATION</p>
        <form
          className="form-container"
          id="judgeInfoForm"
          onSubmit={handleSubmit}
        >
          <div className="label-container">
            <label className="custom-label" htmlFor="judge">
              What is this judge's name?
            </label>
          </div>

          <select
            className="custom-select"
            id="judge"
            onChange={handleFormChange}
          >
            {judgesList}
          </select>
          <div className="label-container">
            <label className="custom-label" htmlFor="position">
              What position are they?
            </label>
          </div>
          <select
            className="custom-select"
            id="position"
            onChange={handleFormChange}
          >
            {positionsList}
          </select>
          <div className="label-container">
            <label className="custom-label" htmlFor="teacher">
              Is the judge also a teacher?
            </label>
          </div>
          <select
            className="custom-select"
            id="teacher"
            onChange={handleFormChange}
          >
            <option className="tour-dates" name="isTeacher" value={true}>
              Yes
            </option>
            <option className="tour-dates" name="isTeacher" value={false}>
              No
            </option>
          </select>
          <div className="label-container">
            <label className="custom-label" htmlFor="competition">
              What competition group is this for?
            </label>
          </div>

          <select
            className="custom-select"
            id="competition"
            onChange={handleFormChange}
          >
            {competitionGroupsList}
          </select>
          <div className="btn-block">
            <button
              className="btn btn-grey"
              onClick={() => history.push("/tour-dates")}
            >
              BACK
            </button>

            <button
              className="btn btn-purple"
              type="submit"
              onClick={() => handleSubmit}
            >
              NEXT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
