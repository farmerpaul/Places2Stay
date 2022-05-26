import React, {useContext, useEffect, useRef, useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Calendar, DateData} from 'react-native-calendars';

import {PlacesFilterContext} from '/context';
import {FlowStep} from '/component/partial';
import {Button, Text, ToggleInput} from '/component/base';
import {Animated, StyleSheet, View} from 'react-native';
import {colors} from '/theme';

export type FilterByTypeProps = {
  route: RouteProp<any>;
  navigation: NativeStackNavigationProp<any>;
  onSelect?: (value: string) => void;
};

const styles = StyleSheet.create({
  container: {
    minHeight: 560,
  },
  calendar: {
    marginTop: 20,
    borderRadius: 8,
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
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
});

const FilterByDate: React.FC<FilterByTypeProps> = ({navigation}) => {
  const filterContext = useContext(PlacesFilterContext);
  const [dateMode, setDateMode] = useState('range');
  const [startDate, setStartDate] = useState<DateData>();
  const [endDate, setEndDate] = useState<DateData>();
  const [dateRange, setDateRange] = useState<Array<DateData>>();
  const [flexDateLength /*, setFlexDateLength*/] = useState('weekend');
  const [flexDateMonths /*, setFlexDateMonths*/] =
    useState<Array<{month: number; year: number}>>();

  const modeAnim = useRef(new Animated.Value(0)).current;

  /* Effects.
  =================================================== */
  useEffect(() => {
    Animated.spring(modeAnim, {
      toValue: dateMode === 'range' ? 0 : 1,
      speed: 14,
      bounciness: 10,
      useNativeDriver: true,
    }).start();
  }, [dateMode, modeAnim]);

  /* Event handlers.
  =================================================== */
  const onPressNext = () => {
    filterContext.dateMode = dateMode as 'range' | 'flexible';
    if (dateMode === 'range') {
      filterContext.dateRange = dateRange;
    } else {
      filterContext.flexDateLength = flexDateLength as
        | 'weekend'
        | 'week'
        | 'month';
      filterContext.flexDateMonths = flexDateMonths;
    }
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
      setDateRange(undefined);
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
      setDateRange(dates);
    } else {
      // Begin first date range selection by picking start date.
      setStartDate(date);
    }
  };

  /* Render component.
  =================================================== */
  return (
    <FlowStep
      navigation={navigation}
      title={filterContext.city}
      style={styles.container}>
      <ToggleInput
        options={[
          {value: 'range', label: 'Calendar'},
          {value: 'flexible', label: 'I’m flexible'},
        ]}
        value={dateMode}
        setValue={setDateMode}
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
          ]}>
          <Calendar
            markingType="period"
            markedDates={{
              ...(dateRange &&
                Object.fromEntries(
                  dateRange.map(date => [
                    date.dateString,
                    {color: colors.teal},
                  ]),
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
          ]}>
          <Text variant="title2" style={styles.heading}>
            Stay for a <Text variant="title2bold">{flexDateLength}</Text>
          </Text>
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
