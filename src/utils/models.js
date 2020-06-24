/* eslint-disable max-classes-per-file */
/* eslint-disable camelcase */
export class TargetRoutine {
  constructor({
    performance_division_level_id,
    routine,
    studio_code,
    age_division,
    performance_division,
    routine_category,
    date_routine_id,
    online_scoring_id,
  }) {
    this.performance_division_level_id = performance_division_level_id;
    this.routine = routine;
    this.studio_code = studio_code;
    this.age_division = age_division;
    this.performance_division = performance_division;
    this.routine_category = routine_category;
    this.date_routine_id = date_routine_id;
    this.online_scoring_id = online_scoring_id;
  }
}

export class ScorePostData {
  constructor({
    isTabulator,
    competition_group_id,
    date_routine_id,
    event_id,
    tour_date_id,
    online_scoring_id,
    staff_id,
    note,
    score,
    not_friendly,
    i_choreographed,
    position,
    teacher_critique,
    is_coda,
    buttons,
    strongest_level_1_id,
    weakest_level_1_id,
  }) {
    this.isTabulator = isTabulator;
    this.competition_group_id = competition_group_id;
    this.date_routine_id = date_routine_id;
    this.event_id = event_id;
    this.tour_date_id = tour_date_id;
    this.data = {
      online_scoring_id,
      staff_id,
      note,
      score,
      not_friendly,
      i_choreographed,
      position,
      teacher_critique,
      is_coda,
      buttons,
      strongest_level_1_id,
      weakest_level_1_id,
    };
  }
}

export class RectangleProps {
  constructor({
    header_name,
    level_4_name,
    id,
    header_level,
    level_3_name,
    level_1_id,
  }) {
    this.level = this.determineLevel({ header_level, level_4_name });
    this.isHeader = !!header_name;
    this.text = this.determineText({ header_name, level_3_name, level_4_name });

    if (!header_name) {
      this.level_4_id = id;
      this.level_1_id = level_1_id;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  determineLevel({ header_level, level_4_name }) {
    return header_level || (!level_4_name ? 3 : 4);
  }

  // eslint-disable-next-line class-methods-use-this
  determineText({ header_name, level_3_name, level_4_name }) {
    return header_name || level_4_name || level_3_name;
  }
}

export class ButtonTable {
  constructor({ height, columns, rows }) {
    this.rectangleHeight = height;
    this.minColumns = columns;
    this.minRows = rows;
  }
}
