/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import Navigation from './navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" />
        <Navigation />
      </SafeAreaProvider>
    </Provider>
  );
};

// const styles = StyleSheet.create({

// });

export default App;
