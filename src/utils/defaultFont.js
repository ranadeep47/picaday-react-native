// typography.js

import React from 'react';
import {Text, StyleSheet, TextInput} from 'react-native';

export const setDefaultFont = () => {
  const components = [Text, TextInput];
  components.forEach(TextComponent => {
    const oldTextRender = TextComponent.render;
    TextComponent.render = function (...args) {
      const origin = oldTextRender.call(this, ...args);
      return React.cloneElement(origin, {
        style: [styles.defaultText, origin.props.style],
      });
    };
  });
};

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
});
