/**
 * MetaLab React Native Training - Places2Stay App
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, View} from 'react-native';

import {colors} from '/theme/colors';
import {Icon} from '/component/base';
import {Home, Stay} from '/screen';

// Work around deprecation notices in react-native-snap-carousel module.
import {LogBox} from 'react-native';
LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.yellow,
    flex: 1,
    color: colors.black,
  },
  navBar: {
    backgroundColor: colors.yellowLight,
    borderColor: '#E9E5DC',
    borderTopWidth: 1,
    paddingTop: 12,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  navBarButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const App = () => {
  const [screen, setScreen] = useState('home');

  return (
    <>
      <SafeAreaView style={styles.container}>
        {screen === 'home' && <Home />}
        {screen === 'stay' && <Stay />}
      </SafeAreaView>
      <View style={styles.navBar}>
        <Pressable
          style={styles.navBarButton}
          onPress={() => setScreen('home')}>
          <Icon svg={require('/asset/svg/home.svg')} />
        </Pressable>
        <Pressable
          style={styles.navBarButton}
          onPress={() => setScreen('stay')}>
          <Icon svg={require('/asset/svg/calendar.svg')} />
        </Pressable>
      </View>
    </>
  );
};

export default App;
