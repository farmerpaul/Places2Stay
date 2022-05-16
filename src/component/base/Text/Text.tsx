import React from 'react';
import {
  StyleSheet,
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle as RNTextStyle,
} from 'react-native';

export type TextVariant = 'title' | 'body' | 'muted';

export type Props = RNTextProps & {
  style?: RNTextStyle;
  variant?: TextVariant;
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
  muted: {
    fontSize: 12,
    lineHeight: 15,
    color: '#858585',
  },
});

const Text: React.FC<Props> = ({variant = 'body', style, children}) => {
  return <RNText style={[variantStyles[variant], style]}>{children}</RNText>;
};

export default Text;
