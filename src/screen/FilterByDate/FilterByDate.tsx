import React, {useContext, useEffect, useRef, useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DateData} from 'react-native-calendars';

import {PlacesFilterContext} from '/context';
import {FlowStep} from '/component/partial';
import {Button, ToggleInput} from '/component/base';
import {Animated, StyleSheet, View} from 'react-native';
import {Calendar, Flexible} from './component';

export type FilterByTypeProps = {
  route: RouteProp<any>;
  navigation: NativeStackNavigationProp<any>;
  onSelect?: (value: string) => void;
};

const styles = StyleSheet.create({
  container: {
    minHeight: 575,
  },
  calendarHeader: {
    fontSize: 10,
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
  const [flexDateMonths, setFlexDateMonths] =
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
          {/* Date range selector (calendar) pane */}
          <Calendar
            {...{startDate, setStartDate, endDate, setEndDate, range, setRange}}
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
          {/* Flexible dates selector pane */}
          <Flexible
            {...{
              flexDateLength,
              setFlexDateLength,
              flexDateMonths,
              setFlexDateMonths,
            }}
          />
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
