import React from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';

const { height, width } = Dimensions.get('screen');

const Cart = () => {
  return (
      <View style={styles.container}>
          <Text style={styles.title}>
              Games Start
          </Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
      height,
      width,
      alignItems: 'center',
      justifyContent: 'center',
  },
  title: {
      fontSize: 24,
  }
});

export default Cart;
