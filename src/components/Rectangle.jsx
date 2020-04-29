/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Rectangle extends Component {
  constructor(props) {
    super(props);
    this.state = { grade: 'neutral' };
    this.goodToggle = this.goodToggle.bind(this);
  }

  goodToggle(e) {
    e.preventDefault();
    const currentState = this.state;
    switch (currentState.grade) {
      case 'good':
        this.setState({ grade: 'bad' });
        break;
      case 'bad':
        this.setState({ grade: 'neutral' });
        break;
      default:
        this.setState({ grade: 'good' });
        break;
    }
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.goodToggle(e);
    }
  }

  render() {
    const { level_4_id, level_1_id, isHeader, level, text } = this.props;
    const { grade } = this.state;
    return (
      <div
        level_4_id={level_4_id}
        level_1_id={level_1_id}
        grade={grade}
        className={`rectangle level_${isHeader ? level : 4} ${grade}`}
        onClick={!isHeader ? this.goodToggle : null}
        onKeyDown={(e) => this.handleKeyPress(e)}
        role="button"
        tabIndex={0}
      >
        {isHeader ? null : <div className="scoring-button-indent" />}
        {text}
      </div>
    );
  }
}

Rectangle.propTypes = {
  level_4_id: PropTypes.number.isRequired,
  level_1_id: PropTypes.number.isRequired,
  isHeader: PropTypes.bool.isRequired,
  level: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};
