import React from 'react';
import {
  StyleSheet,
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle as RNTextStyle,
} from 'react-native';
import {colors} from '/theme/colors';

export type TextProps = RNTextProps & {
  variant?: TextVariant;
  color?: keyof typeof colors;
  textAlign?: 'left' | 'center' | 'right';
  style?: RNTextStyle;
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
  title2: {
    fontFamily: 'Bitter-Regular',
    fontSize: 16,
    lineHeight: 19.2,
  },
  title2bold: {
    fontFamily: 'Bitter-Bold',
    fontSize: 16,
    lineHeight: 19.2,
  },
  body: {
    fontSize: 12,
    lineHeight: 15,
  },
});

const Text: React.FC<TextProps> = ({
  variant = 'body',
  color = 'black',
  textAlign = 'left',
  style,
  children,
}) => {
  return (
    <RNText
      style={[
        styles.base,
        styles[variant],
        {color: colors[color]},
        {textAlign},
        style,
      ]}>
      {children}
    </RNText>
  );
};

export default Text;
