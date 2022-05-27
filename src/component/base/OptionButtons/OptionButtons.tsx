import React from 'react';
import {Pressable, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

import {Text} from '/component/base';
import {colors} from '/theme';

export type OptionButtonsProps = {
  options: Array<{value: string; label: string}>;
  value: string;
  onPressOption: (value: string) => void;
  style?: StyleProp<ViewStyle>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  option: {
    backgroundColor: colors.white,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: colors.greyLight,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  optionSelected: {
    borderColor: colors.black,
  },
});

const OptionButtons: React.FC<OptionButtonsProps> = ({
  options,
  value,
  onPressOption,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {options.map(option => (
        <Pressable
          key={option.value}
          onPress={() => onPressOption(option.value)}
          style={[
            styles.option,
            value === option.value && styles.optionSelected,
          ]}>
          <Text variant="base">{option.label}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default OptionButtons;
