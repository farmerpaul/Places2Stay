import React from 'react';
import Animated, {
  BaseAnimationBuilder,
  EntryExitAnimationFunction,
  interpolate,
  interpolateColor,
  Keyframe,
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
  entering?:
    | BaseAnimationBuilder
    | typeof BaseAnimationBuilder
    | EntryExitAnimationFunction
    | Keyframe
    | undefined;
  exiting?:
    | BaseAnimationBuilder
    | typeof BaseAnimationBuilder
    | EntryExitAnimationFunction
    | Keyframe
    | undefined;
  disabled?: boolean;
};

const Pressable: React.FC<PressableProps> = ({
  scale = 0.94,
  colorAnimation,
  positionStyle,
  onPressIn,
  onPressOut,
  style,
  children,
  entering,
  exiting,
  disabled = false,
  ...props
}) => {
  const shared = useSharedValue(1);

  /* Set up animated styles.
  =================================================== */
  const animStyle = useAnimatedStyle(() => ({
    transform: [
      {
        // Use spring effect for scale when releasing the press, otherwise
        // use standard easing.
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
    // Use standard easing for opacity/fade.
    opacity: withTiming(interpolate(shared.value, [0, 1], [0.8, 1]), {
      duration: 200,
    }),
    // Add an animated color property if requested.
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

  /* Render component.
  =================================================== */
  return (
    <RNPressable
      onPressIn={event => {
        !disabled && (shared.value = 0);
        onPressIn?.(event);
      }}
      onPressOut={event => {
        shared.value = 1;
        onPressOut?.(event);
      }}
      style={positionStyle}
      {...props}>
      {entering || exiting ? (
        // Entering transition conflicts with animated opacity above, so break
        // up animations using two separate Animated.Views.
        <Animated.View entering={entering} exiting={exiting}>
          <Animated.View style={[animStyle, style]}>{children}</Animated.View>
        </Animated.View>
      ) : (
        <Animated.View style={[animStyle, style]}>{children}</Animated.View>
      )}
    </RNPressable>
  );
};

export default Pressable;
