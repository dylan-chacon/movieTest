import React, { useState } from 'react';
import {
  Dimensions, StyleSheet, View, ScrollView, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { register } from './actionCreator';
import InputBasic from '../../components/InputBasic';
import ButtonBasic from '../../components/ButtonBasic';

const { height, width } = Dimensions.get('screen');

const Registry = () => {
  // redux

  const dispatch = useDispatch();

  // state

  const [validation, setValidation] = useState(false);
  const [input, setInput] = useState({
    email: '',
    name: '',
    userName: '',
    password: '',
  });
  const {
    email, password, name, userName,
  } = input;

  // navigation

  const { navigate } = useNavigation();

  // fnc

  const validate = (value) => {
    if (value !== undefined) setValidation(true); else setValidation(false);
  };
  const checkEmptyInputs = (Email, Password, Name, UserName) => {
    if (Email.trim() === '' || Password.trim() === ''
         || Name.trim() === '' || UserName.trim() === '') return true;
    return false;
  };
  const pressRegistry = async (Email, Password, Name, UserName, val) => {
    if (checkEmptyInputs(Email, Password, Name, UserName)) return;
    if (val) return;
    if (val === false && !checkEmptyInputs(Email, Password, Name, UserName)) {
      await dispatch(register(Email, Password, Name, UserName));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'silver' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.icon}>
          <Icon
            name="arrow-left"
            type="font-awesome"
            onPress={() => navigate('Login')}
            color="#fff"
            size={35}
          />
        </View>
        <InputBasic
          keyboardType="email-address"
          placeholder="Correo electrónico"
          validation="email"
          value={email}
          changeText={(text, err) => {
            setInput({ ...input, email: text });
            validate(err);
          }}
        />
        <InputBasic
          placeholder="Nombre completo"
          validation="name"
          value={name}
          changeText={(text, err) => {
            setInput({ ...input, name: text });
            validate(err);
          }}
        />
        <InputBasic
          placeholder="Nombre de usuario"
          validation="name"
          value={userName}
          changeText={(text, err) => {
            setInput({ ...input, userName: text });
            validate(err);
          }}
        />
        <InputBasic
          secureTextEntry
          placeholder="Contraseña"
          validation="password"
          value={password}
          changeText={(text, err) => {
            setInput({ ...input, password: text });
            validate(err);
          }}
        />
        <ButtonBasic
          text="Registrarse"
          buttonStyle={styles.buttonStyle}
          textStyle={styles.textButtons}
          onPress={() => pressRegistry(
            email, password, name, userName, validation,
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height - StatusBar.currentHeight,
    width,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#07283b',
  },
  logo: {
    height: height * 0.2,
    width: width * 0.35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTerms: {
    fontSize: height * 0.02,
    marginLeft: width * 0.08,
    marginRight: width * 0.1,
    marginBottom: height * 0.03,
    textAlign: 'center',
    color: '#2672FF',
  },
  buttonStyle: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.06,
    width: width * 0.8,
    borderRadius: 8,
    backgroundColor: '#2672FF',
  },
  textButtons: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    alignSelf: 'flex-start',
    margin: 10,
  },
});
export default Registry;
