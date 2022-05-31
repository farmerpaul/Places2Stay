import React from 'react';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import {
  Pressable as RNPressable,
  PressableProps as RNPressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

export type PressableProps = RNPressableProps & {
  scale?: number;
  colorAnimation?: {property: string; inactive: string; active: string};
  positionStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
};

const Pressable: React.FC<PressableProps> = ({
  scale = 0.94,
  colorAnimation,
  positionStyle,
  onPressIn,
  onPressOut,
  style,
  children,
  ...props
}) => {
  const shared = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale:
          shared.value === 0
            ? withTiming(interpolate(shared.value, [0, 1], [scale, 1]), {
                duration: 200,
              })
            : withSpring(interpolate(shared.value, [0, 1], [scale, 1]), {
                mass: 1.5,
                stiffness: 850,
                restDisplacementThreshold: 0.003,
              }),
      },
    ],
    opacity: withTiming(interpolate(shared.value, [0, 1], [0.8, 1]), {
      duration: 200,
    }),
    ...(colorAnimation && {
      [colorAnimation.property]: withTiming(
        interpolateColor(
          shared.value,
          [0, 1],
          [colorAnimation.active, colorAnimation.inactive],
        ),
        {duration: 200},
      ),
    }),
  }));

  return (
    <RNPressable
      onPressIn={event => {
        shared.value = 0;
        onPressIn?.(event);
      }}
      onPressOut={event => {
        shared.value = 1;
        onPressOut?.(event);
      }}
      style={positionStyle}
      {...props}>
      <Animated.View style={[animStyle, style]}>{children}</Animated.View>
    </RNPressable>
  );
};

export default Pressable;