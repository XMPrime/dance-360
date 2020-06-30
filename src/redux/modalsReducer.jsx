export function toggleModal(modalType) {
  return {
    type: 'TOGGLE_MODAL',
    modalType,
  };
}

const initialState = {
  authModal: false,
  welcomeModal: true,
  judgeInfoModal: false,
  scoringModal: false,
};

export default function modalsReducer(modalsState = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_MODAL':
      return {
        ...modalsState,
        [`${action.modalType}Modal`]: !modalsState[`${action.modalType}Modal`],
      };
    default:
      return modalsState;
  }
}
