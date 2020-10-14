import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { theme } from '../core/theme';

const SubHeader = ({ children }) => <Text style={styles.header}>{children}</Text>;

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
});

export default memo(SubHeader);
