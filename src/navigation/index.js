import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HeaderLogo from '../components/Logo';
import RemixIcon from '../components/RemixIcon';

import HomeTabs from '../screens/HomeTabs';
import CameraView from '../screens/CameraView';
import DayView from '../screens/DayView';
import PhotoView from '../screens/PhotoView';

import {colors, sizes} from '../utils/constants';

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleAlign: 'center',
          headerTitle: () => <HeaderLogo />,
          headerBackTitleVisible: false,
          headerBackImage: () => (
            <RemixIcon
              name="arrow-left-s-line"
              color={colors.primary}
              size={sizes.roundedBtnIconSize}
            />
          ),
        }}>
        <Stack.Screen name="Home" component={HomeTabs} />
        <Stack.Screen name="CameraView" component={CameraView} />
        <Stack.Screen name="DayView" component={DayView} />
        <Stack.Screen name="PhotoView" component={PhotoView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
