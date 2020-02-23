import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Rectangle(props) {
  // const { buttonsData } = useSelector(state => state.scoring);
  // let backgroundColor;
  // switch (props.level) {
  //   case 1:
  //     backgroundColor = ""
  //     return
  //     case 2:
  //     backgroundColor = ""
  //     return
  //     case 3:
  //     backgroundColor = ""
  //     return
  //     case 4:
  //     backgroundColor = ""
  //     return
  //     default:
  //       backgroundColor = ""
  //       return

  // }
  return (
    <div className={`rectangle level_${props.isHeader ? props.level : 4}`}>
      {props.isHeader ? null : <div className="scoring-button-indent"></div>}
      {props.text}
    </div>
  );
}
