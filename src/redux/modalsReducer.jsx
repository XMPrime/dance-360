export const openModal = (props) => (dispatch) => {
  return new Promise((resolve) => {
    dispatch({
      type: 'TOGGLE_MODAL',
      resolve,
      props,
    });
  });
};

export const closeModal = (result) => (dispatch, getState) => {
  const { resolve } = getState().modals;
  if (resolve) resolve(result);
  dispatch({
    type: 'TOGGLE_MODAL',
  });
};

const initialState = {
  show: false,
  resolve: null,
  props: {},
};

export default function modalsReducer(modalsState = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_MODAL':
      return {
        ...modalsState,
        show: !modalsState.show,
        resolve: action.resolve,
        props: action.props || {},
      };
    default:
      return modalsState;
  }
}
