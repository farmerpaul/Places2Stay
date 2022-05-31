import React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';

import {colors} from '/theme';
import {Pressable, Text} from '/component/base';

export type ButtonProps = {
  label: string;
  variant?: 'primary' | 'secondary';
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  primary: {
    backgroundColor: colors.blue,
    borderRadius: 8,
    minWidth: 120,
  },
  secondary: {},
});

const textStyles = StyleSheet.create({
  primary: {
    color: colors.white,
  },
  secondary: {
    textDecorationLine: 'underline',
  },
});

const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  onPress,
  style,
}) => {
  return (
    <Pressable onPress={onPress} style={[styles.base, styles[variant], style]}>
      <Text variant="base" textAlign="center" style={textStyles[variant]}>
        {label}
      </Text>
    </Pressable>
  );
};

export default Button;
