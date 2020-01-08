import React, { useContext } from "react";
import Header from "./Header";
import { JudgeContext } from "../JudgeContext";

export default function Scoring() {
  const { judgeInfo } = useContext(JudgeContext);

  return (
    <div className="generic-page">
      <Header title="SCORING:" barIcon={true} />
    </div>
  );
}
