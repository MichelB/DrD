import React from 'react';
import { Provider } from 'react-native-paper';
import App from './src';
import AppAuth from './src/Auth';
import { theme } from './src/core/theme';
import AsyncStorage from '@react-native-community/async-storage'
var STORAGE_KEY = 'id_token';
const Main = () => {
  const getIdToken = async () => {
    try {
      var IdToken = await AsyncStorage.getItem(STORAGE_KEY)
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
    return IdToken
  }
  return (
    <Provider theme={theme}>
      {getIdToken() ? <AppAuth /> : <App />}
    </Provider>
  )
};
export default Main;