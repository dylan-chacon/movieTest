import Actions from '../../redux/actionTypes';

const STATE_INITIAL = {
  error: false,
  logueado: false,
  message: '',
};

export default (state = STATE_INITIAL, action) => {
  switch (action.type) {
    case Actions.LOGIN_ERROR:
      return {
        ...state,
        error: true,
        message: action.messageError,
      };
    case Actions.LOGIN_CANCELED:
    case Actions.LOGIN_SUCCESS:
      return {
        ...state,
        error: false,
        logueado: true,
      };
    default:
      return { ...state };
  }
};
