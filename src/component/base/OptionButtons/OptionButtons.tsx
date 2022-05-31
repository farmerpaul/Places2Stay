import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

import {Option} from './component';

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
        <Option
          key={option.value}
          value={option.value}
          label={option.label}
          onPress={() => onPressOption(option.value)}
          isSelected={option.value === value}
        />
      ))}
    </View>
  );
};

export default OptionButtons;
