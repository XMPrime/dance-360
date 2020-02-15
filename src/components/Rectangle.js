import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Rectangle(props) {
  // const { buttonsData } = useSelector(state => state.scoring);
  return (
    <div className={`rectangle`}>
      <div className={`level_${props.level}`}>{props.text}</div>
    </div>
  );
}
