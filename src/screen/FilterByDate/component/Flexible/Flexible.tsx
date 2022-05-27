import React from 'react';
import {StyleSheet} from 'react-native';
import XDate from 'xdate';
import {OptionButtons, Text} from '/component/base';
import {MonthPicker} from '/component/partial';

export type FlexibleProps = {
  flexDateLength: 'weekend' | 'week' | 'month';
  setFlexDateLength: (value: 'weekend' | 'week' | 'month') => void;
  flexDateMonths?: Array<{month: number; year: number}>;
  setFlexDateMonths: (value: Array<{month: number; year: number}>) => void;
};

const styles = StyleSheet.create({
  heading: {
    marginTop: 32,
    marginBottom: 16,
  },
});

const Flexible: React.FC<FlexibleProps> = ({
  flexDateLength,
  setFlexDateLength,
  flexDateMonths,
  setFlexDateMonths,
}) => {
  /* Event handlers.
  =================================================== */
  // Add/remove pressed month from the selected months.
  const onPressMonth = (pressedValue: {month: number; year: number}) => {
    const selectedMonths = flexDateMonths ?? [];

    const found = selectedMonths.some(
      value =>
        value.month === pressedValue.month && value.year === pressedValue.year,
    );
    if (found) {
      // Matching month found, make a copy of the array with it removed.
      setFlexDateMonths(
        selectedMonths.filter(
          value =>
            !(
              value.month === pressedValue.month &&
              value.year === pressedValue.year
            ),
        ),
      );
    } else {
      // Matching month not found, make a copy of the array with it added.
      setFlexDateMonths([...selectedMonths, pressedValue]);
    }
  };

  /* Render component.
  =================================================== */
  return (
    <>
      <Text variant="title2" style={styles.heading}>
        Stay for a <Text variant="title2bold">{flexDateLength}</Text>
      </Text>
      <OptionButtons
        options={[
          {value: 'weekend', label: 'Weekend'},
          {value: 'week', label: 'Week'},
          {value: 'month', label: 'Month'},
        ]}
        value={flexDateLength}
        onPressOption={value =>
          setFlexDateLength(value as 'weekend' | 'week' | 'month')
        }
      />
      <Text variant="title2" style={styles.heading}>
        {flexDateMonths?.length ? (
          <>
            Go in{' '}
            <Text variant="title2bold">
              {flexDateMonths
                .map(date =>
                  new XDate()
                    .setFullYear(date.year)
                    .setMonth(date.month)
                    .toString('MMMM'),
                )
                .join(', ')}
            </Text>
          </>
        ) : (
          'Select availability'
        )}
      </Text>
      <MonthPicker
        months={[...Array(12).keys()].map((_value, i) => {
          const date = new XDate().addMonths(i);
          return {month: date.getMonth(), year: date.getFullYear()};
        })}
        selectedMonths={flexDateMonths}
        onPressMonth={onPressMonth}
      />
    </>
  );
};

export default Flexible;
