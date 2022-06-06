/**
 * MetaLab React Native Training - Places2Stay App
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

// Workaround for deprecation notices in react-native-snap-carousel module:
import {Alert, LogBox} from 'react-native';
LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);
// ... end workaround.

import React, {useEffect, useState} from 'react';
import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import messaging from '@react-native-firebase/messaging';

import {HomeTabs, SearchStack} from '/component/navigator';
import {
  Availability,
  Guests,
  PlacesFilterProvider,
  StayType,
} from '/context/PlacesFilterContext/PlacesFilterContext';

const {Navigator, Screen} = createNativeStackNavigator();

const linking = {
  prefixes: ['places2stay://'],
  config: {
    screens: {
      HomeTabs: {
        screens: {
          Home: 'home',
          Stay: 'stay',
        },
      },
      SearchStack: {
        screens: {
          SearchCities: 'search',
          FilterByType: 'search/:city',
        },
      },
    },
  },
};

const App = () => {
  // Declare current filter state variables and pass them to the provider below.
  const [city, setCity] = useState<string>();
  const [stayType, setStayType] = useState<StayType>();
  const [availability, setAvailability] = useState<Availability>();
  const [guests, setGuests] = useState<Guests>();

  /* Effects.
  =================================================== */
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  /* Render app.
  =================================================== */
  return (
    <PlacesFilterProvider
      value={{
        city: [city, setCity],
        stayType: [stayType, setStayType],
        availability: [availability, setAvailability],
        guests: [guests, setGuests],
      }}>
      <NavigationContainer
        linking={
          linking as LinkingOptions<{
            HomeTabs: unknown;
          }>
        }>
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
