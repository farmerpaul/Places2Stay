import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

import {Icon, Text} from '/component/base';

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
  /* Event handlers.
  =================================================== */
  const onPressAdd = () => {
    if (typeof maxValue === 'undefined' || value < maxValue) {
      setValue(value + 1);
    }
  };

  const onPressRemove = () => {
    if (typeof minValue === 'undefined' || value > minValue) {
      setValue(value - 1);
    }
  };

  /* Render component.
  =================================================== */
  return (
    <View style={styles.container}>
      <Pressable onPress={onPressRemove}>
        <Icon svg={require('/asset/svg/remove.svg')} width="32" height="32" />
      </Pressable>
      <Text variant="base" textAlign="center" style={styles.value}>
        {value}
      </Text>
      <Pressable onPress={onPressAdd}>
        <Icon svg={require('/asset/svg/add.svg')} width="32" height="32" />
      </Pressable>
    </View>
  );
};

export default RangeInput;
