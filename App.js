import React from 'react';
import { decode, encode } from 'base-64';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import AppInitialNavigation from './src/navigation/AppInitialNavigation';

if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;

export default function App() {
  return (
    <Provider store={store}>
      <AppInitialNavigation />
    </Provider>
  );
}
