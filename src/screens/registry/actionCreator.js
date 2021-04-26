import Actions from '../../redux/actionTypes';
import firebase from '../../../firebase';
import { loginEmailAndPassword } from '../login/actionCreator';

// eslint-disable-next-line import/prefer-default-export
export const register = (email, password, name, userName) => async (dispatch) => {
  await firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch((error) => {
    // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      return dispatch({
        type: Actions.REGISTER_ERROR,
        payload: { errorCode, errorMessage },
      });
    // ...
    }).then(async ({ user }) => {
      const { uid, photoURL } = await firebase.auth().currentUser;
      const dbh = firebase.firestore();
      const usersCollection = dbh.collection('users');
      await usersCollection.doc(user.uid).set({
        name, userName, coverURL: '', description: '', uid, imageURL: photoURL,
      })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          return dispatch({
            type: Actions.REGISTER_ERROR,
            payload: { errorCode, errorMessage },
          });
        });
    })
    .then(dispatch(loginEmailAndPassword(email, password)));
  await firebase.auth().currentUser.updateProfile({ displayName: name });
};
