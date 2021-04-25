import React, { useState } from 'react';
import validate from 'validate.js';
import { Input } from 'react-native-elements';
import styles from './styles';

const InputBasic = ({
  validation,
  secureTextEntry,
  placeholder,
  value,
  keyboardType,
  inputStyle,
  containerStyle,
  changeText,
  inputContainerStyle = {},
  autoCapitalize = 'none',
  showLabel = false,
  labelStyle = {},
  errorMessage,
  errorStyle = {},
  textAlign = 'center',
  errorProps = {},
}) => {
  const [error, setError] = useState(false);
  const [borderColor, setBorderColor] = useState({ borderColor: 'white', borderWidth: 0 });
  const valid = (text, val) => {
    switch (val) {
      case 'name':
        return validateName(text);
      case 'age':
        return validateAge(text);
      case 'email':
        return validateEmail(text);
      case 'password':
        return validatePassword(text);
      case 'cellphone':
        return validateCellphone(text);
      default:
        return changeText(text);
    }
  };

  const validateName = (name) => {
    const constraints = {
      name: {
        length: {
          minimum: 8,
          maximum: 20,
        },
        format: {
          pattern: '[^#$+/"&@!?]+',
          flags: 'gi',
          message: 'can only contain a-z and 0-9',
        },
      },
    };

    const newError = validate({ name }, constraints);
    setError(!(newError === undefined));
    return changeText(name, newError);
  };

  const validateEmail = (email) => {
    const constraints = {
      from: {
        email: true,
      },
    };
    const newError = validate({ from: email }, constraints);
    setError(!(newError === undefined));
    return changeText(email, newError);
  };

  const validateAge = (age) => {
    const constraints = {
      duration: {
        numericality: {
          onlyInteger: true,
          greaterThan: 10,
          lessThan: 100,
        },
        length: {
          maximum: 10,
        },
      },
    };
    const newError = validate({ duration: age }, constraints);
    setError(!(newError === undefined));
    return changeText(age, newError);
  };

  const validatePassword = (password) => {
    const constraints = {
      password: {
        presence: true,
        length: {
          minimum: 6,
          maximum: 20,
        },
      },
    };
    const newError = validate({ password }, constraints);
    setError(!(newError === undefined));
    return changeText(password, newError);
  };

  const validateCellphone = (cellphone) => {
    const constraints = {
      cellphone: {
        length: {
          minimum: 10,
          maximum: 20,
        },
      },
    };
    const newError = validate({ cellphone }, constraints);
    setError(!(newError === undefined));
    return changeText(cellphone, newError);
  };

  return (
    <Input
      label={showLabel ? placeholder : null}
      placeholder={placeholder}
      onChange={(e) => {
        valid(e.nativeEvent.text, validation);
      }}
      value={value}
      keyboardType={keyboardType}
      inputContainerStyle={[styles.inputContainerStyle(error), inputContainerStyle, borderColor]}
      textAlign={textAlign}
      containerStyle={[styles.containerStyle, containerStyle]}
      style={[styles.inputStyle, inputStyle]}
      labelStyle={[styles.labelStyle, labelStyle]}
      secureTextEntry={secureTextEntry}
      placeholderTextColor="rgba(0, 0, 0, 0.31)"
      underlineColorAndroid="transparent"
      autoCapitalize={autoCapitalize}
      errorMessage={error ? errorMessage : null}
      errorStyle={[styles.errorStyle(error), errorStyle]}
      errorProps={errorProps}
      onTextInput={() => {
        setBorderColor(() => ({
          borderWidth: 1,
          borderColor: error ? '#BE1622' : '#547808',
        }));
      }}
    />
  );
};

export default InputBasic;
