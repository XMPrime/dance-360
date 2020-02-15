import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import ScoringSideMenu from "./ScoringSideMenu";
import Rectangle from "./Rectangle";

import {
  setButtonsData,
  setRoutinesData,
  setScoringBreakdownData,
  objectMap
} from "../redux/scoringReducer";

export default function Scoring() {
  const dispatch = useDispatch();
  const selectedEvent = useSelector(state => state.events.selectedEvent);
  const tourDateId = useSelector(state => state.tourDates.tourDateId);
  const judgeInfo = useSelector(state => state.judgeInfo);
  const {
    buttonsData,
    routinesData,
    scoringBreakdownData,
    displaySideMenu
  } = useSelector(state => state.scoring);
  const axios = require("axios");

  const test = buttonsData[7].level_4.map(button => {
    return <div>{button.id}</div>;
  });

  // const buttonsList = buttonsData[7].level_4.map(button => {
  //   if (button.header_name !== null) {
  //         return (
  //           <Rectangle level={button.header_level} text={button.header_name} />
  //         );
  //   } else {
  //     if (button.level_4_name === null) {
  //       //level 3 buttons
  //       return (
  //         <Rectangle level={3} text={button.level_3_name} />
  //       );
  //     } else {
  //       //level 4 buttons
  //       return (
  //         <Rectangle level={4} text={button.level_4_name} />
  //       );
  //     }
  //   }
  // });

  // console.log(buttonsData[7].level_4);

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
      .then(response => {
        console.log(response);
        dispatch(setRoutinesData(response.data));
      });

    axios.get(buttonsUrl).then(response => {
      console.log(response);
      dispatch(setButtonsData(response.data));
    });
    axios
      .get(scoringBreakdownUrl, {
        params: {
          event_id: selectedEvent.id
        }
      })
      .then(response => {
        console.log(response);
        dispatch(setScoringBreakdownData(response.data));
      });
  }, []);

  // console.log(buttonsData);
  return (
    <div className="generic-page">
      <Header title="SCORING:" barIcon={true}></Header>
      {displaySideMenu ? <ScoringSideMenu /> : null}
      {test}
    </div>
  );
}
