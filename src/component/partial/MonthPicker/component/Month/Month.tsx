import React, {memo} from 'react';
import {Pressable, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import XDate from 'xdate';

import {colors} from '/theme';
import {Icon, Text} from '/component/base';

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
    borderColor: colors.silver,
    borderRadius: 8,
  },
  selected: {
    borderColor: colors.black,
  },
  monthText: {
    marginTop: 8,
    marginBottom: 4,
    fontSize: 14,
  },
});

const Month: React.FC<MonthProps> = memo(
  ({month, year, isSelected = false, onPress, style}) => (
    <Pressable
      onPress={onPress}
      style={[styles.container, isSelected && styles.selected, style]}>
      <Icon svg={require('/asset/svg/month.svg')} width={32} height={32} />
      <Text textAlign="center" variant="base" style={styles.monthText}>
        {new XDate().setFullYear(year).setMonth(month).toString('MMMM')}
      </Text>
      <Text textAlign="center" color="grey">
        {year}
      </Text>
    </Pressable>
  ),
);

export default Month;
