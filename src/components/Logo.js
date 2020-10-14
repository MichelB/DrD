import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';
import Logo2 from '../../src/assets/diet-doctor-lookup.svg';

const Logo = () => (
  <Logo2/>
);

const styles = StyleSheet.create({
  image: {
    width: 128,
    height: 128,
    marginBottom: 12,
  },
});

export default memo(Logo);
