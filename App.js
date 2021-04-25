import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { decode, encode } from 'base-64';
import Navigation from './src/navigation/appInitialNavigation';

if(!global.btoa) global.btoa = encode;
if(!global.atob) global.atob = decode;

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
