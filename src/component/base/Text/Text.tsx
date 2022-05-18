import React from 'react';
import {
  StyleSheet,
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle as RNTextStyle,
} from 'react-native';
import {colors} from '/theme/colors';

export type Props = RNTextProps & {
  style?: RNTextStyle;
  variant?: TextVariant;
  color?: keyof typeof colors;
};

export type TextVariant = keyof typeof styles;

const styles = StyleSheet.create({
  base: {
    fontFamily: 'EncodeSans-Regular',
    fontSize: 16,
  },
  title: {
    fontFamily: 'Bitter-Regular',
    fontSize: 24,
    lineHeight: 28.8,
  },
  body: {
    fontSize: 12,
    lineHeight: 15,
  },
});

const Text: React.FC<Props> = ({
  variant = 'body',
  color = 'black',
  style,
  children,
}) => {
  return (
    <RNText
      style={[styles.base, styles[variant], {color: colors[color]}, style]}>
      {children}
    </RNText>
  );
};

export default Text;
