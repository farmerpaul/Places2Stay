/**
 * MetaLab React Native Training - Places2Stay App
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

// Workaround for deprecation notices in react-native-snap-carousel module.
import {LogBox, StyleSheet} from 'react-native';
LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Home, Stay, Search} from '/screen';
import {Icon} from '/component/base';
import {colors} from '/theme';
import {HeaderButton} from '/component/partial';

const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.yellowLight,
    borderColor: '#E9E5DC',
    borderTopWidth: 1,
    paddingTop: 12,
    paddingBottom: 20,
  },
});

const TabNavigator = () => {
  const getRouteSvg = (name: string) => {
    switch (name) {
      default:
      case 'Home':
        return require('/asset/svg/home.svg');

      case 'Search':
        return require('/asset/svg/search.svg');

      case 'Stay':
        return require('/asset/svg/calendar.svg');
    }
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => (
          <Icon svg={getRouteSvg(route.name)} color={color} />
        ),
        tabBarInactiveTintColor: colors.black,
        tabBarActiveTintColor: colors.blue,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        headerTitle: '',
        headerTransparent: true,
        headerLeft: () => (
          <HeaderButton svg={require('/asset/svg/bell.svg')} side="left" />
        ),
        headerRight: () => (
          <HeaderButton svg={require('/asset/svg/profile.svg')} side="right" />
        ),
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Stay" component={Stay} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        <RootStack.Screen name="TabNavigator" component={TabNavigator} />
        <RootStack.Group screenOptions={{presentation: 'modal'}}>
          <RootStack.Screen name="Search" component={Search} />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
