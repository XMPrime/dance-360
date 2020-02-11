import React, { useEffect } from "react";
import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";
// import { JudgeContext } from "../JudgeContext";

export default function Scoring() {
  // const { judgeInfo } = useContext(JudgeContext);
  const dispatch = useDispatch();
  const selectedEvent = useSelector(state => state.events.selectedEvent);
  const tourDateId = useSelector(state => state.tourDates.tourDateId);
  const judgeGroupId = useSelector(state => state.judgeInfo.judgeGroupId);
  const judgeInfo = useSelector(state => state.judgeInfo);
  const axios = require("axios");

  useEffect(() => {
    console.log(tourDateId, judgeGroupId, judgeInfo.judgePosition);
    const routinesUrl = "https://api.d360test.com/api/coda/routines";
    const buttonsUrl = "https://api.d360test.com/api/coda/buttons";
    const scoringBreakdownUrl =
      "https://api.d360test.com/api/coda/scoring-breakdown";

    axios
      .get(routinesUrl, {
        params: {
          tour_date_id: tourDateId,
          competition_group_id: judgeGroupId,
          position: judgeInfo.judgePosition
        }
      })
      .then(response => console.log(response));

    axios.get(buttonsUrl).then(response => console.log(response));
    axios
      .get(scoringBreakdownUrl, {
        params: {
          event_id: selectedEvent.id
        }
      })
      .then(response => console.log(response));
  }, []);
  return (
    <div className="generic-page">
      <Header title="SCORING:" barIcon={true} />
    </div>
  );
}
