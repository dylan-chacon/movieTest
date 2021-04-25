import React, { useState } from 'react';
import {
  View, Text, Dimensions, Alert, Platform, StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SocialIcon, Icon } from 'react-native-elements';
import * as GoogleSignIn from 'expo-google-sign-in';
import InputBasic from '../../components/InputBasic';
import ButtonBasic from '../../components/ButtonBasic';
import { loginEmailAndPassword, loginWithCredential } from './actionCreator';
import firebase from '../../../firebase';

const { height, width } = Dimensions.get('screen');

const Login = () => {
  // navigation

  const { navigate } = useNavigation();

  // react-redux

  const dispatch = useDispatch();
  const state = useSelector((sta) => sta.login);
  const { error } = state;

  // useState

  const [validation, setValidation] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: 'Hubo un error',
  });
  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  const { email, password } = input;

  // loginEaP

  const logInEaP = async (Email, Password, val) => {
    if (Email.trim() === '' || Password.trim() === '') setAlert({ show: true, message: 'No pueden haber campos vacíos' });
    if (val) setAlert({ show: true, message: 'Ingresaste información incorrecta en algún campo' });
    if (error === false && Email.trim() !== '' && Password.trim() !== '') {
      await dispatch(loginEmailAndPassword(Email, Password));
    }
  };

  // login google

  const loginGoogle = async () => {
    try {
      signInAsync();
    } catch (e) {
      Alert.alert('loginGoogleeee:', JSON.stringify(e));
    }
  };
  const syncUserWithStateAsync = async () => {
    const user = await GoogleSignIn.signInSilentlyAsync();
    await dispatch(loginWithCredential(user.auth.accessToken));
  };
  const signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      await GoogleSignIn.signInAsync();
      syncUserWithStateAsync();
    } catch ({ message: mess }) {
      Alert.alert('logiiiiin: askForPlayServicesAsync:', mess);
      await firebase.firestore().collection('prueba').add({ error: 'entre al error signInAsync' });
    }
  };

  // validate

  const validate = (value) => {
    if (value !== undefined) setValidation(true); else setValidation(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'silver' }}>
      <View style={styles.container}>
        <Icon
          name="movie-search"
          type="material-community"
          color="white"
          size={height * 0.2}
          containerStyle={{ margin: 20 }}
        />
        <InputBasic
          keyboardType="email-address"
          autoCompleteType="email"
          textContentType="emailAddress"
          autoCapitalize="none"
          placeholder="Correo electrónico"
          validation="email"
          value={email}
          changeText={(text, err) => {
            setInput({ ...input, email: text });
            validate(err);
          }}
        />
        <InputBasic
          placeholder="Contraseña"
          validation="password"
          value={password}
          textContentType="password"
          changeText={(text, err) => {
            setInput({ ...input, password: text });
            validate(err);
          }}
          onSubmitEditing={() => logInEaP(email, password, validation)}
          secureTextEntry
        />
        <ButtonBasic
          text="Iniciar sesión"
          buttonStyle={styles.buttonStyle}
          textStyle={styles.textButtons}
          onPress={() => logInEaP(email, password, validation)}
        />
        {Platform.OS === 'android' && (
          <SocialIcon
            title="Iniciar con Google"
            button
            type="google"
            style={styles.socialStyle}
            fontStyle={styles.textButtons}
            onPress={() => loginGoogle()}
          />
        )}
        <Text
          style={styles.textLogin}
          onPress={() => navigate('Registry')}
        >
          ¿Aún no tienes cuenta?
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height,
    width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#07283b',
  },
  logo: {
    marginTop: height * 0.02,
    marginBottom: height * 0.085,
    height: height * 0.2,
    width: width * 0.35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textPass: (val) => ({
    fontSize: 16,
    alignSelf: 'flex-start',
    marginLeft: width * 0.1,
    marginRight: width * 0.1,
    marginTop: !val ? height * -0.01 : 0,
    marginBottom: !val ? height * 0.02 : 0,
    color: '#2672FF',
  }),
  textLogin: {
    fontSize: 18,
    marginTop: height * 0.03,
    color: '#2672FF',
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.06,
    width: width * 0.8,
    borderRadius: 8,
    marginBottom: height * 0.01,
    backgroundColor: '#2672FF',
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 3,
  },
  socialStyle: {
    height: height * 0.06,
    width: width * 0.8,
    borderRadius: 8,
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 3,
  },
  textButtons: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Login;
