/**
 * MetaLab React Native Training - Places2Stay App
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

// Workaround for deprecation notices in react-native-snap-carousel module.
import {LogBox} from 'react-native';
LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeTabs, SearchStack} from '/component/navigator';
import {PlacesFilterProvider} from '/context/PlacesFilterContext/PlacesFilterContext';

const {Navigator, Screen} = createNativeStackNavigator();

const App = () => {
  const filterContext = {};

  return (
    <PlacesFilterProvider value={filterContext}>
      <NavigationContainer>
        <Navigator screenOptions={{headerShown: false}}>
          <Screen name="HomeTabs" component={HomeTabs} />
          <Screen
            name="SearchStack"
            component={SearchStack}
            options={{presentation: 'modal'}}
          />
        </Navigator>
      </NavigationContainer>
    </PlacesFilterProvider>
  );
};

export default App;
