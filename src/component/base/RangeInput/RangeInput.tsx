import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Icon, Pressable, Text} from '/component/base';
import {colors} from '/theme';

export type RangeInputProps = {
  value: number;
  setValue: (value: number) => void;
  minValue?: number;
  maxValue?: number;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    minWidth: 10,
    marginHorizontal: 16,
  },
});

const RangeInput: React.FC<RangeInputProps> = ({
  value,
  setValue,
  minValue,
  maxValue,
}) => {
  const isMaximum = () => typeof maxValue !== 'undefined' && value >= maxValue;
  const isMinimum = () => typeof minValue !== 'undefined' && value <= minValue;

  /* Event handlers.
  =================================================== */
  const onPressAdd = () => {
    if (!isMaximum()) {
      setValue(value + 1);
    }
  };

  const onPressRemove = () => {
    if (!isMinimum()) {
      setValue(value - 1);
    }
  };

  /* Render component.
  =================================================== */
  return (
    <View style={styles.container}>
      <Pressable onPress={onPressRemove} scale={0.9} disabled={isMinimum()}>
        <Icon
          svg={require('/asset/svg/remove.svg')}
          width={32}
          height={32}
          color={isMinimum() ? colors.muted : colors.black}
        />
      </Pressable>
      <Text variant="base" textAlign="center" style={styles.value}>
        {value}
      </Text>
      <Pressable onPress={onPressAdd} scale={0.9} disabled={isMaximum()}>
        <Icon
          svg={require('/asset/svg/add.svg')}
          width={32}
          height={32}
          color={isMaximum() ? colors.muted : colors.black}
        />
      </Pressable>
    </View>
  );
};

export default RangeInput;
