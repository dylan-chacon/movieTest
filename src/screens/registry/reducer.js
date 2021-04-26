import Actions from '../../redux/actionTypes';

const STATE_INITIAL = {
  error: false,
  errorMessage: '',
  errorCode: '',
};

export default (state = STATE_INITIAL, action) => {
  switch (action.type) {
    case Actions.REGISTER_ERROR:
      return {
        ...state,
        error: true,
        errorCode: action.payload.errorCode,
        errorMessage: action.payload.errorMessage,
      };
    default:
      return { ...state };
  }
};
