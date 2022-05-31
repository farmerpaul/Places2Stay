import React, {memo} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import XDate from 'xdate';

import {colors} from '/theme';
import {Icon, Text, Pressable} from '/component/base';
import {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

export type MonthProps = {
  month: number;
  year: number;
  isSelected?: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 88,
    marginRight: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 8,
  },
  monthText: {
    marginTop: 8,
    marginBottom: 4,
    fontSize: 14,
  },
});

const Month: React.FC<MonthProps> = memo(
  ({month, year, isSelected = false, onPress, style}) => {
    const borderColor = useDerivedValue(
      () => (isSelected ? colors.black : colors.silver),
      [isSelected],
    );

    const animStyle = useAnimatedStyle(() => ({
      borderColor: withTiming(borderColor.value, {duration: 200}),
    }));

    return (
      <Pressable onPress={onPress} style={[styles.container, animStyle, style]}>
        <Icon svg={require('/asset/svg/month.svg')} width={32} height={32} />
        <Text textAlign="center" variant="base" style={styles.monthText}>
          {new XDate()
            .setDate(1)
            .setFullYear(year)
            .setMonth(month)
            .toString('MMMM')}
        </Text>
        <Text textAlign="center" color="grey">
          {year}
        </Text>
      </Pressable>
    );
  },
);

export default Month;
