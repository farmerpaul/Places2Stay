import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {WebViewNavigation} from 'react-native-webview';

import {Home, Stay} from '/screen';
import {Icon} from '/component/base';
import {colors} from '/theme';
import {HeaderButton, WebViewModal} from '/component/partial';
import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.yellowLight,
    borderColor: '#E9E5DC',
    borderTopWidth: 1,
    paddingTop: 12,
    paddingBottom: 20,
  },
});

const {Navigator, Screen} = createBottomTabNavigator();

const HomeTabs = () => {
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

  /* WebView setup
  =================================================== */
  const URL =
    Platform.OS === 'android'
      ? 'http://10.0.2.2:8080'
      : 'http://localhost:8080';
  const [webViewVisible, setWebViewVisible] = useState(false);

  const handleNavigationStateChange = ({url}: WebViewNavigation) => {
    // Check if URL contains success text; if so, close WebView.
    if (url?.includes('?success=true')) {
      setWebViewVisible(false);
    }
  };

  return (
    <>
      <Navigator
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
            <HeaderButton
              svg={require('/asset/svg/bell.svg')}
              side="left"
              onPress={() => setWebViewVisible(true)}
            />
          ),
          headerRight: () => (
            <HeaderButton
              svg={require('/asset/svg/profile.svg')}
              side="right"
            />
          ),
        })}>
        <Screen name="Home" component={Home} />
        <Screen name="Stay" component={Stay} />
      </Navigator>
      <WebViewModal
        visible={webViewVisible}
        setVisible={setWebViewVisible}
        source={{uri: URL}}
        cacheEnabled={false}
        onNavigationStateChange={handleNavigationStateChange}
      />
    </>
  );
};

export default HomeTabs;
