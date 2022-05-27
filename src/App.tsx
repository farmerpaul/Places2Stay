/**
 * MetaLab React Native Training - Places2Stay App
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

// Workaround for deprecation notices in react-native-snap-carousel module:
import {LogBox} from 'react-native';
LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);
// ... end workaround.

import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeTabs, SearchStack} from '/component/navigator';
import {
  Availability,
  Guests,
  PlacesFilterProvider,
  StayType,
} from '/context/PlacesFilterContext/PlacesFilterContext';

const {Navigator, Screen} = createNativeStackNavigator();

const App = () => {
  // Declare current filter state variables and pass them to the provider below.
  const [city, setCity] = useState<string>();
  const [stayType, setStayType] = useState<StayType>();
  const [availability, setAvailability] = useState<Availability>();
  const [guests, setGuests] = useState<Guests>();

  return (
    <PlacesFilterProvider
      value={{
        city: [city, setCity],
        stayType: [stayType, setStayType],
        availability: [availability, setAvailability],
        guests: [guests, setGuests],
      }}>
      <NavigationContainer>
        <Navigator screenOptions={{headerShown: false}}>
          <Screen name="HomeTabs" component={HomeTabs} />
          <Screen
            name="SearchStack"
            component={SearchStack}
            options={{
              presentation: 'fullScreenModal',
              gestureEnabled: false,
            }}
          />
        </Navigator>
      </NavigationContainer>
    </PlacesFilterProvider>
  );
};

export default App;
