import React, {useState} from 'react';
import {
  Easing,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

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
  const [scale, setScale] = useState(1);

  return (
    <View style={[styles.container, style]}>
      {options.map(option => (
        <Animatable.View
          key={option.value}
          // @ts-expect-error
          transition="scale"
          duration={250}
          easing={Easing.elastic(2)}
          style={{transform: [{scale}]}}>
          <Pressable
            onPressIn={() => setScale(0.94)}
            onPressOut={() => setScale(1)}
            onPress={() => onPressOption(option.value)}
            style={[
              styles.option,
              value === option.value && styles.optionSelected,
            ]}>
            <Text variant="base">{option.label}</Text>
          </Pressable>
        </Animatable.View>
      ))}
    </View>
  );
};

export default OptionButtons;
