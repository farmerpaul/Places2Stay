import React, {useContext, useEffect, useRef, useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Calendar, DateData} from 'react-native-calendars';

import {PlacesFilterContext} from '/context';
import {FlowStep} from '/component/partial';
import {Button, OptionButtons, Text, ToggleInput} from '/component/base';
import {Animated, StyleSheet, View} from 'react-native';
import {colors} from '/theme';

export type FilterByTypeProps = {
  route: RouteProp<any>;
  navigation: NativeStackNavigationProp<any>;
  onSelect?: (value: string) => void;
};

const styles = StyleSheet.create({
  container: {
    minHeight: 575,
  },
  calendar: {
    marginTop: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
  calendarHeader: {
    fontSize: 10,
  },
  heading: {
    marginTop: 32,
  },
  animView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  optionButtons: {
    marginVertical: 16,
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    marginBottom: 16,
  },
});

const FilterByDate: React.FC<FilterByTypeProps> = ({navigation}) => {
  const {
    city: [city],
    availability: [, setAvailability],
  } = useContext(PlacesFilterContext);

  const [mode, setMode] = useState<'range' | 'flexible'>('range');
  const [startDate, setStartDate] = useState<DateData>();
  const [endDate, setEndDate] = useState<DateData>();
  const [range, setRange] = useState<Array<DateData>>();
  const [flexDateLength, setFlexDateLength] = useState<
    'weekend' | 'week' | 'month'
  >('weekend');
  const [flexDateMonths /*, setFlexDateMonths*/] =
    useState<Array<{month: number; year: number}>>();

  const modeAnim = useRef(new Animated.Value(0)).current;

  /* Effects.
  =================================================== */
  useEffect(() => {
    Animated.spring(modeAnim, {
      toValue: mode === 'range' ? 0 : 1,
      speed: 14,
      bounciness: 10,
      useNativeDriver: true,
    }).start();
  }, [mode, modeAnim]);

  /* Event handlers.
  =================================================== */
  const onPressNext = () => {
    const availability = {
      mode,
      ...(mode === 'range' ? {range} : {flexDateLength, flexDateMonths}),
    };
    setAvailability(availability);
    navigation.navigate('FilterByGuests');
  };

  const onPressSkip = () => {
    navigation.navigate('FilterByGuests');
  };

  const onDayPress = (date: DateData) => {
    if (endDate) {
      // Reset date range if there's already an end date picked.
      setStartDate(date);
      setEndDate(undefined);
      setRange(undefined);
    } else if (startDate) {
      // Complete current date range selection if there's a start date picked.
      setEndDate(date);
      // Generate array of dates to highlight on calendar.
      const dates: Array<DateData> = [];
      for (
        let curDate = new Date(startDate.dateString);
        curDate <= new Date(date.dateString);
        curDate.setDate(curDate.getDate() + 1)
      ) {
        dates.push({
          dateString: curDate.toISOString().split('T')[0],
          day: curDate.getDate() + 1,
          month: curDate.getMonth(),
          year: curDate.getFullYear(),
          timestamp: curDate.getTime(),
        });
      }
      setRange(dates);
    } else {
      // Begin first date range selection by picking start date.
      setStartDate(date);
    }
  };

  /* Render component.
  =================================================== */
  return (
    <FlowStep navigation={navigation} title={city} style={styles.container}>
      <ToggleInput
        options={[
          {value: 'range', label: 'Calendar'},
          {value: 'flexible', label: 'I’m flexible'},
        ]}
        value={mode}
        setValue={value => setMode(value as 'range' | 'flexible')}
      />
      <View>
        <Animated.View
          style={[
            styles.animView,
            {
              opacity: modeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
                extrapolate: 'clamp',
              }),
              transform: [
                {
                  translateX: modeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -200],
                  }),
                },
              ],
            },
          ]}
          pointerEvents={mode === 'range' ? 'auto' : 'none'}>
          <Calendar
            markingType="period"
            markedDates={{
              ...(range &&
                Object.fromEntries(
                  range.map(date => [date.dateString, {color: colors.teal}]),
                )),
              ...(startDate && {
                [startDate.dateString]: {
                  color: colors.blue,
                  textColor: colors.white,
                  startingDay: true,
                  endingDay:
                    !endDate || endDate.dateString === startDate.dateString,
                },
              }),
              ...(endDate &&
                endDate.dateString !== startDate?.dateString && {
                  [endDate.dateString]: {
                    color: colors.blue,
                    textColor: colors.white,
                    endingDay: true,
                  },
                }),
            }}
            onDayPress={onDayPress}
            style={styles.calendar}
            theme={{
              textDayFontSize: 14,
              textMonthFontSize: 14,
              textDayHeaderFontSize: 12,
              // @ts-expect-error
              'stylesheet.calendar.main': {
                container: {
                  backgroundColor: colors.white,
                  padding: 0,
                },
              },
            }}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.animView,
            {
              opacity: modeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                extrapolate: 'clamp',
              }),
              transform: [
                {
                  translateX: modeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [200, 0],
                  }),
                },
              ],
            },
          ]}
          pointerEvents={mode === 'range' ? 'none' : 'auto'}>
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
                      new Date(date.year, date.month).toLocaleString(
                        'default',
                        {
                          month: 'long',
                        },
                      ),
                    )
                    .join(', ')}
                </Text>
              </>
            ) : (
              'Select availability'
            )}
          </Text>
        </Animated.View>
      </View>
      <View style={styles.bottomActions}>
        <Button label="Skip" variant="secondary" onPress={onPressSkip} />
        <Button label="Next" variant="primary" onPress={onPressNext} />
      </View>
    </FlowStep>
  );
};

export default FilterByDate;
