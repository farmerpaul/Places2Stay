import React from 'react';
import {DateData} from 'react-native-calendars';

const PlacesFilterContext = React.createContext<{
  city?: string;
  type?: string;
  dateMode?: 'range' | 'flexible';
  dateRange?: Array<DateData>;
  flexDateLength?: 'weekend' | 'week' | 'month';
  flexDateMonths?: Array<{month: number; year: number}>;
  adults?: number;
  children?: number;
  infants?: number;
  pets?: number;
}>({});

export const PlacesFilterProvider = PlacesFilterContext.Provider;

export default PlacesFilterContext;
