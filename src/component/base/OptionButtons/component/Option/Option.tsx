import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

import {Pressable, Text} from '/component/base';
import {colors} from '/theme';

export type OptionProps = {
  value: string;
  label: string;
  onPress: (value: string) => void;
  isSelected?: boolean;
};

const styles = StyleSheet.create({
  option: {
    backgroundColor: colors.white,
    borderRadius: 32,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
});

const Option: React.FC<OptionProps> = memo(
  ({value, label, onPress, isSelected = false}) => {
    const borderColor = useDerivedValue(
      () => (isSelected ? colors.black : colors.silver),
      [isSelected],
    );

    const animStyle = useAnimatedStyle(() => ({
      borderColor: withTiming(borderColor.value, {duration: 200}),
    }));

    return (
      <Pressable
        onPress={() => onPress(value)}
        style={[styles.option, animStyle]}>
        <Text variant="base">{label}</Text>
      </Pressable>
    );
  },
);

export default Option;
