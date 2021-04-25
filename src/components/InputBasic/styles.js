import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  inputContainerStyle: () => ({
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.06,
    width: width * 0.73,
    borderRadius: 70,
    backgroundColor: '#E7EBE1', // gainsboro, //siver
    alignSelf: 'center',
  }),
  labelStyle: {
    width: width * 0.8,
    alignSelf: 'flex-start',
    color: 'white',
    marginBottom: 10,
  },
  inputStyle: {
    color: 'rgba(0, 0, 0, 0.76)',
    fontSize: 17,
    paddingLeft: 11,
  },
  errorStyle: () => ({
    color: '#DA3535',
  }),
});
export default styles;
