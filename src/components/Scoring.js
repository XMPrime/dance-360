import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import ScoringSideMenu from "./ScoringSideMenu";

export default function Scoring() {
  const dispatch = useDispatch();
  const selectedEvent = useSelector(state => state.events.selectedEvent);
  const tourDateId = useSelector(state => state.tourDates.tourDateId);
  const judgeInfo = useSelector(state => state.judgeInfo);
  const displaySideMenu = useSelector(state => state.scoring.displaySideMenu);
  const axios = require("axios");

  useEffect(() => {
    const routinesUrl = "https://api.d360test.com/api/coda/routines";
    const buttonsUrl = "https://api.d360test.com/api/coda/buttons";
    const scoringBreakdownUrl =
      "https://api.d360test.com/api/coda/scoring-breakdown";

    axios
      .get(routinesUrl, {
        params: {
          tour_date_id: tourDateId,
          competition_group_id: judgeInfo.judgeGroupId,
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
      <Header title="SCORING:" barIcon={true}></Header>
      {displaySideMenu ? <ScoringSideMenu /> : null}
    </div>
  );
}
