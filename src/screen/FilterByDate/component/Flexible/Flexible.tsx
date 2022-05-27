import React from 'react';
import {StyleSheet} from 'react-native';
import {OptionButtons, Text} from '/component/base';

export type FlexibleProps = {
  flexDateLength: 'weekend' | 'week' | 'month';
  setFlexDateLength: (value: 'weekend' | 'week' | 'month') => void;
  flexDateMonths?: Array<{month: number; year: number}>;
  setFlexDateMonths: (value: Array<{month: number; year: number}>) => void;
};

const styles = StyleSheet.create({
  heading: {
    marginTop: 32,
  },
  optionButtons: {
    marginVertical: 16,
  },
});

const Flexible: React.FC<FlexibleProps> = ({
  flexDateLength,
  setFlexDateLength,
  flexDateMonths,
  setFlexDateMonths,
}) => {
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
        style={styles.optionButtons}
      />
      <Text variant="title2" style={styles.heading}>
        {flexDateMonths ? (
          <>
            Go in{' '}
            <Text variant="title2bold">
              {flexDateMonths
                .map(date =>
                  new Date(date.year, date.month).toLocaleString('default', {
                    month: 'long',
                  }),
                )
                .join(', ')}
            </Text>
          </>
        ) : (
          'Select availability'
        )}
      </Text>
    </>
  );
};

export default Flexible;
