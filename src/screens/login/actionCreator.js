import firebase from '../../../firebase';
import Actions from '../../redux/actionTypes';

export const loginEmailAndPassword = (email, password) => async (dispatch) => {
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((result) => {
      if (Object.prototype.hasOwnProperty.call(result, 'type')) {
        return dispatch({
          type: Actions.LOGIN_ERROR,
          messageError: 'error desconocido',
        });
      }
      return dispatch({
        type: Actions.LOGIN_SUCCESS,
      });
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      return dispatch({
        type: Actions.LOGIN_ERROR,
        messageError: errorCode,
      });
    });
};

export const loginWithCredential = (idToken) => async (dispatch) => {
  try {
    const credential = firebase.auth.GoogleAuthProvider.credential(idToken);
    const result = await firebase.auth().signInWithCredential(credential);

    if (Object.prototype.hasOwnProperty.call(result, 'type')) {
      console.log(result);
      return dispatch({
        type: Actions.LOGIN_ERROR,
        messageError: 'error desconocido',
      });
    }
    return dispatch({
      type: Actions.LOGIN_SUCCESS,
    });
  } catch (e) {
    console.log(e);
    if (e.code === 'ERR_CANCELED') {
      // handle that the user canceled the sign-in flow
      return dispatch({
        type: Actions.LOGIN_CANCELED,
        messageError: e.code,
      });
    }
    // handle other errors
    return dispatch({
      type: Actions.LOGIN_ERROR,
      messageError: e.code,
    });
  }
};
