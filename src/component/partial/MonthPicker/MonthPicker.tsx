import React, {useRef} from 'react';
import {
  StyleProp,
  StyleSheet,
  useWindowDimensions,
  ViewStyle,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import {Month} from './component';
import {spacing} from '/theme';

export type MonthPickerProps = {
  months: Array<{month: number; year: number}>;
  selectedMonths?: Array<{month: number; year: number}>;
  onPressMonth: (month: {month: number; year: number}) => void;
  style?: StyleProp<ViewStyle>;
};

const styles = StyleSheet.create({
  carousel: {
    marginHorizontal: -spacing.gutter,
    paddingLeft: spacing.gutter,
    paddingVertical: 2,
  },
});

const MonthPicker: React.FC<MonthPickerProps> = ({
  months,
  selectedMonths,
  onPressMonth,
  style,
}) => {
  const carouselRef = useRef<Carousel<any>>(null);
  const {width} = useWindowDimensions();

  /* Render component.
  =================================================== */
  return (
    <Carousel
      ref={carouselRef}
      data={months}
      renderItem={({item, index}) => (
        <Month
          month={item.month}
          year={item.year}
          onPress={() => {
            carouselRef.current?.snapToItem(index - 1);
            onPressMonth(item);
          }}
          isSelected={selectedMonths?.some(
            value => value.month === item.month && value.year === item.year,
          )}
        />
      )}
      sliderWidth={width}
      itemWidth={100}
      activeSlideAlignment="start"
      inactiveSlideOpacity={1}
      inactiveSlideScale={1}
      containerCustomStyle={[styles.carousel, style]}
      removeClippedSubviews={false}
    />
  );
};

export default MonthPicker;
