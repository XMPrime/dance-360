// ACTION CREATORS:
export function toggleJudgeDropdown() {
  return {
    type: 'TOGGLE_JUDGE_DROPDOWN',
  };
}

const initialState = {
  IsOpen: false,
};

export default function judgeDropdownReducer(
  judgeDropdownState = initialState,
  action,
) {
  switch (action.type) {
    case 'TOGGLE_JUDGE_DROPDOWN':
      return { ...judgeDropdownState, isOpen: !judgeDropdownState.isOpen };
    case 'SET_SELECTED_EVENT':
      return { ...judgeDropdownState, selectedEvent: action.event };
    default:
      return judgeDropdownState;
  }
}
