import React, {useState} from 'react';
import {
  Easing,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import {colors} from '/theme';
import {Text} from '/component/base';

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
  const [scale, setScale] = useState(1);

  return (
    <Animatable.View
      // @ts-expect-error
      transition="scale"
      duration={250}
      easing={Easing.elastic(2)}
      style={{transform: [{scale}]}}>
      <Pressable
        onPressIn={() => setScale(0.94)}
        onPressOut={() => setScale(1)}
        onPress={onPress}
        style={[styles.base, styles[variant], style]}>
        <Text variant="base" textAlign="center" style={textStyles[variant]}>
          {label}
        </Text>
      </Pressable>
    </Animatable.View>
  );
};

export default Button;
