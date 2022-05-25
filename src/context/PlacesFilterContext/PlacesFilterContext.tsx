import React from 'react';

const PlacesFilterContext = React.createContext<{
  city?: string;
  dateRanges?: Array<{start: Date; end: Date}>;
  adults?: number;
  children?: number;
  infants?: number;
  pets?: number;
}>({});

export const PlacesFilterProvider = PlacesFilterContext.Provider;

export default PlacesFilterContext;
