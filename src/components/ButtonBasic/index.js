import React from 'react';
import {
  TouchableOpacity, Image, Text, View,
} from 'react-native';

const ButtonBasic = ({
  imageStyle,
  buttonStyle,
  onPress,
  text,
  image,
  textStyle,
  icon,
  disabled = false,
}) => (
  <TouchableOpacity style={buttonStyle} onPress={onPress} disabled={disabled}>
    <Image source={image} style={imageStyle} />
    <View
      style={{
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {text && <Text style={textStyle}>{text}</Text>}
      {icon}
    </View>
  </TouchableOpacity>
);

export default ButtonBasic;
