import {Platform} from 'react-native';

export const sizes = {
  tabBarSize: Platform.select({ios: 80, android: 60}),
  roundedButtonSize: 60,
  roundedBtnIconSize: 24,
};

export const colors = {
  primary: '#6C6C6C',
  secondary: '#00E3BA',
  darkPrimary: '#314743',
  border: '#E5E5E5',
};
