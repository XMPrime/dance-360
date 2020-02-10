import React, { useEffect } from "react";
import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";
// import { JudgeContext } from "../JudgeContext";

export default function Scoring() {
  // const { judgeInfo } = useContext(JudgeContext);
  const dispatch = useDispatch();
  const tourDateId = useSelector(state => state.tourDates.tourDateId);
  const judgeGroupId = useSelector(state => state.judgeInfo.judgeGroupId);
  const judgeInfo = useSelector(state => state.judgeInfo);
  const axios = require("axios");

  useEffect(() => {
    console.log(tourDateId, judgeGroupId, judgeInfo.judgePosition);
    const url = "https://api.d360test.com/api/coda/routines";
    axios
      .get(url, {
        tour_date_id: tourDateId,
        competition_group_id: judgeGroupId,
        position: judgeInfo.judgePosition
      })
      .then(response => console.log(response));
  });
  return (
    <div className="generic-page">
      <Header title="SCORING:" barIcon={true} />
    </div>
  );
}
