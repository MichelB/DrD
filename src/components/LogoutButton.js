import React, { memo } from 'react';
import { TouchableOpacity, Image, StyleSheet,Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Logout from '../../src/assets/logout.svg';

var STORAGE_KEY = 'id_token';
async function _userLogout(navigation){
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    navigation.navigate('HomeScreen')
  }
}

const LogoutButton = ({ navigation }) => (
  <TouchableOpacity onPress={() => _userLogout(navigation)} style={styles.container}>
    <Image style={styles.image} source={require('../assets/logout.png')} />
  </TouchableOpacity>
);



const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 15 + getStatusBarHeight(),
    left: Dimensions.get('window').width - 24 -10,
    
    alignSelf: 'flex-end',
    backgroundColor:'red'
    
  },
  image: {
    width: 24,
    height: 24,
  },
});

export default memo(LogoutButton);
