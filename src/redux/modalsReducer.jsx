// export function toggleModal(modalType) {
//   return {
//     type: 'TOGGLE_MODAL',
//     modalType,
//   };
// }

export const toggleModal = (props) => (dispatch) => {
  dispatch({
    type: 'TOGGLE_MODAL',
    props,
  });
};

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

// class ModalProps {
//   constructor() {

//   }
// }

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
