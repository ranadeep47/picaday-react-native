import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Dimensions, View, Platform} from 'react-native';
import React from 'react';
import Home from '../Home';
import Summary from '../Summary';

import RoundedButton from '../../components/RoundedButton';
import RemixIcon from '../../components/RemixIcon';
import {colors, sizes} from '../../utils/constants';

const {height} = Dimensions.get('window');

const HomeTabs = ({navigation}) => {
  const Tab = createBottomTabNavigator();
  const tabBarOptions = {
    showLabel: false,
    activeTintColor: colors.darkPrimary,
    style: {
      height: sizes.tabBarSize,
      elevation: 1, //override default elevation of 8, so that our fab can float
    },
  };

  return (
    <View style={styles.container}>
      <Tab.Navigator initialRouteName="Home" tabBarOptions={tabBarOptions}>
        <Tab.Screen
          name="HomeTab"
          component={Home}
          options={{
            tabBarIcon: ({focused, color, size}) => {
              const iconType = focused ? 'fill' : 'line';
              return (
                <RemixIcon
                  name={`home-${iconType}`}
                  color={color}
                  size={size}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Summary"
          component={Summary}
          options={{
            tabBarIcon: ({focused, color, size}) => {
              const iconType = focused ? 'fill' : 'line';
              return (
                <RemixIcon
                  name={`information-${iconType}`}
                  color={color}
                  size={size}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
      <RoundedButton
        style={styles.floatingButton}
        onPress={() => navigation.navigate('CameraView')}>
        <RemixIcon name="add-line" color={colors.secondary} size={24} />
      </RoundedButton>
    </View>
  );
};

export default HomeTabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  floatingButton: {
    elevation: 2,
    shadowOpacity: 0,
    position: 'absolute',
    top: Platform.select({ios: height - 200, android: height - 180}),
    alignSelf: 'center',
  },
});
