import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../../utils/constants';

const HeaderLogo = () => {
  return (
    <View style={styles.container}>
      <Text style={[styles.primary, styles.text, styles.largeText]}>pic</Text>
      <Text style={[styles.primary, styles.text, styles.regularText]}>a</Text>
      <Text style={[styles.secondary, styles.text, styles.largeText]}>day</Text>
    </View>
  );
};

export default HeaderLogo;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  primary: {
    color: colors.primary,
  },
  text: {
    fontSize: 24,
    lineHeight: 29,
  },
  largeText: {
    fontFamily: 'Inter-Bold',
  },
  regularText: {
    fontFamily: 'Inter-Regular',
  },
  secondary: {
    color: colors.secondary,
  },
});
