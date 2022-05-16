import React from 'react';
import {StyleSheet, Text as RNText, TextStyle} from 'react-native';

export type Props = {
  style?: TextStyle;
  variant?: 'title' | 'body';
};

const variantStyles = StyleSheet.create({
  title: {
    fontSize: 24,
    lineHeight: 28.8,
  },
  body: {
    fontSize: 12,
    lineHeight: 15,
  },
});

const Text: React.FC<Props> = ({variant = 'body', style, children}) => {
  return <RNText style={[variantStyles[variant], style]}>{children}</RNText>;
};

export default Text;
