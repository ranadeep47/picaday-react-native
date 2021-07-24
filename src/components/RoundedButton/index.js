import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {sizes} from '../../utils/constants';

const RoundedButton = ({children, style = null, ...props}) => (
  <TouchableOpacity style={[style, styles.container]} {...props}>
    {children}
  </TouchableOpacity>
);

export default RoundedButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: sizes.roundedButtonSize,
    height: sizes.roundedButtonSize,
    borderRadius: sizes.roundedButtonSize / 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
