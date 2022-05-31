import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {Text} from '/component/base';
import {colors} from '/theme';

export type ToggleInputItem = {
  value: string;
  label: string;
};

export type ToggleInputProps = {
  options: [ToggleInputItem, ToggleInputItem];
  value: string;
  setValue: (value: string) => void;
  style?: StyleProp<ViewStyle>;
};

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
  },
  container: {
    borderRadius: 32,
    padding: 6,
    backgroundColor: colors.greyLight,
    flexDirection: 'row',
  },
  optionText: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  optionTextLast: {
    marginRight: 0,
  },
  highlight: {
    position: 'absolute',
    top: 6,
    bottom: 6,
    borderRadius: 32,
    backgroundColor: colors.white,
  },
});

const ToggleInput: React.FC<ToggleInputProps> = ({
  options,
  value,
  setValue,
  style,
}) => {
  const activeIndex = options.findIndex(option => option.value === value);

  const leftAnim = useRef(new Animated.Value(0));
  const widthAnim = useRef(new Animated.Value(0));

  const containerRef = useRef(null);
  const option0Ref = useRef<View>(null);
  const option1Ref = useRef<View>(null);

  /**
   * Get left & width values of option corresponding to provided index, returned
   * to passed callback function.
   */
  const getPosition = (
    index: number,
    cb: (left: number, width: number) => void,
  ) => {
    containerRef.current &&
      (index === 0 ? option0Ref : option1Ref).current?.measureLayout(
        containerRef.current,
        (left, _top, width, _height) => cb(left, width),
        () => null,
      );
  };

  /* Effects.
  =================================================== */
  // Whenever the active option changes, get the coordinates of the selected
  // option and animate the highlight component to be match it.
  useEffect(() => {
    if (containerRef.current) {
      getPosition(activeIndex, (left, width) => {
        Animated.spring(leftAnim.current, {
          toValue: left,
          speed: 14,
          bounciness: 7,
          useNativeDriver: false,
        }).start();
        Animated.spring(widthAnim.current, {
          toValue: width,
          speed: 14,
          bounciness: 7,
          useNativeDriver: false,
        }).start();
      });
    }
  }, [activeIndex]);

  /* Event handlers.
  =================================================== */
  // Initialize animated values to appropriate defaults.
  const onLayout = () =>
    getPosition(activeIndex, (left, width) => {
      leftAnim.current.setValue(left);
      widthAnim.current.setValue(width);
    });

  /* Render component.
  =================================================== */
  return (
    <View style={[styles.row, style]}>
      <View ref={containerRef} style={styles.container} onLayout={onLayout}>
        <Animated.View
          style={[
            styles.highlight,
            {
              left: leftAnim.current,
              width: widthAnim.current,
            },
          ]}
        />
        {options.map((option, index) => (
          <Pressable
            ref={index === 0 ? option0Ref : option1Ref}
            key={index}
            onPress={() => setValue(option.value)}
            style={[
              styles.optionText,
              index === options.length - 1 && styles.optionTextLast,
            ]}>
            <Text variant="base" textAlign="center">
              {option.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default ToggleInput;
