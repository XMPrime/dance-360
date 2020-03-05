// import React from "react";

// export default function Rectangle(props) {
//   const { level_4_id, level_1_id, isHeader, level, text, good } = this.props;

//   function goodToggle(e) {
//     e.preventDefault();
//     let clickedRectangleClasses = e.target.classList;
//     const currentState = this.state;
//     switch (currentState.grade) {
//       case "great-job":
//         clickedRectangleClasses.remove("great-job");
//         clickedRectangleClasses.add("needs-work");
//         break;
//       case "needs-work":
//         clickedRectangleClasses.remove("needs-work");
//         clickedRectangleClasses.add("neutral");
//         break;
//       case "neutral":
//         clickedRectangleClasses.remove("neutral");
//         clickedRectangleClasses.add("great-job");
//         break;
//       default:
//         clickedRectangleClasses.remove("neutral");
//         clickedRectangleClasses.add("great-job");
//         break;
//     }
//   }

//   return (
//     <div
//       level_4_id={level_4_id}
//       level_1_id={level_1_id}
//       good={good}
//       className={`rectangle level_${isHeader ? level : 4} ${this.state.grade}`}
//       onClick={!isHeader ? goodToggle : null}
//     >
//       {isHeader ? null : <div className="scoring-button-indent"></div>}
//       {text}
//     </div>
//   );
// }

import React, { Component } from "react";

export default class Rectangle extends Component {
  constructor(props) {
    super(props);
    this.state = { grade: "neutral", good: false };
    this.goodToggle = this.goodToggle.bind(this);
  }

  goodToggle(e) {
    e.preventDefault();
    const currentState = this.state;
    switch (currentState.grade) {
      case "great-job":
        this.setState({ grade: "needs-work", good: false });
        break;
      case "needs-work":
        this.setState({ grade: "neutral", good: false });
        break;
      default:
        this.setState({ grade: "great-job", good: true });
        break;
    }
  }
  render() {
    const { level_4_id, level_1_id, isHeader, level, text } = this.props;
    return (
      <div
        level_4_id={level_4_id}
        level_1_id={level_1_id}
        // good={this.state.good}
        good={`${this.state.good}`}
        grade={this.state.grade}
        className={`rectangle level_${isHeader ? level : 4} ${
          this.state.grade
        }`}
        onClick={!isHeader ? this.goodToggle : null}
      >
        {isHeader ? null : <div className="scoring-button-indent"></div>}
        {text}
      </div>
    );
  }
}
