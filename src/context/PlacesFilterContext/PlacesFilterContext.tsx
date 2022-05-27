import React from 'react';
import {DateData} from 'react-native-calendars';

export type StayType = 'shortTerm' | 'longTerm' | 'experience';
export type Availability = {
  mode: 'range' | 'flexible';
  range?: Array<DateData>;
  flexDateLength?: 'weekend' | 'week' | 'month';
  flexDateMonths?: Array<{month: number; year: number}>;
};
export type Guests = {
  adults?: number;
  children?: number;
  infants?: number;
  pets?: number;
};

// eslint-disable-next-line no-spaced-func
const PlacesFilterContext = React.createContext<{
  city: [string | undefined, (city: string | undefined) => void];
  stayType: [StayType | undefined, (stayType: StayType) => void];
  availability: [
    Availability | undefined,
    (availability: Availability) => void,
  ];
  guests: [Guests | undefined, (guests: Guests) => void];
}>(undefined!);

export const PlacesFilterProvider = PlacesFilterContext.Provider;

export default PlacesFilterContext;
