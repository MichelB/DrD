import React, { memo,useEffect } from 'react';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import Logo from '../components/Logo';

const HomeScreen = ({ navigation }) => (
  
  <Background>
    <Logo />
<Header>Login</Header>

    <Paragraph>
     Welcome to Diet Doctor
    </Paragraph>
    <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
      Login
    </Button>
    <Button
      mode="outlined"
      testID="desc-text"
      onPress={() => navigation.navigate('RegisterScreen')}
    >
      Sign Up
    </Button>
  </Background>
);

export default memo(HomeScreen);
