import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  FilterByDate,
  FilterByGuests,
  FilterByType,
  QueryPlaces,
  SearchCities,
} from '/screen';
import {FlowHeader} from '/component/partial';

const {Navigator, Screen} = createNativeStackNavigator();

const SearchStack: React.FC = () => (
  <Navigator
    initialRouteName="Search"
    screenOptions={{
      header: ({options}) =>
        options.title && <FlowHeader title={options.title} />,
    }}>
    <Screen
      component={SearchCities}
      name="SearchCities"
      options={{headerShown: false}}
    />
    <Screen
      component={FilterByType}
      name="FilterByType"
      options={{title: 'What are you\nlooking for?'}}
    />
    <Screen
      component={FilterByDate}
      name="FilterByDate"
      options={{title: 'When will you\nbe there?'}}
    />
    <Screen
      component={FilterByGuests}
      name="FilterByGuests"
      options={{title: 'Who’s going?'}}
    />
    <Screen
      component={QueryPlaces}
      name="QueryPlaces"
      options={{headerShown: false}}
    />
  </Navigator>
);

export default SearchStack;
