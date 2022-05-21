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
import {Icon, Modal, Text} from '/component/base';
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
  const [testModalVisible, setTestModalVisible] = useState(false);

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
        <Pressable
          style={styles.navBarButton}
          onPress={() => setTestModalVisible(true)}>
          <Icon svg={require('/asset/svg/experiment.svg')} />
        </Pressable>
        <Modal
          accessibilityLabel="Test modal"
          visible={testModalVisible}
          setVisible={setTestModalVisible}
          overlayHeading={'What are you\nlooking for?'}
          title="Test modal">
          <Text>
            This is an example of text. Test text here, lots of lines of
            relevant text.
          </Text>
          <Text>
            Test text here, lots of lines of relevant text. This is an example
            of text.
          </Text>
          <Text>
            This is an example of text. Test text here, lots of lines of
            relevant text.
          </Text>
          <Text>
            Test text here, lots of lines of relevant text. This is an example
            of text.
          </Text>
          <Text variant="title">Test modal again</Text>
          <Text>
            This is an example of text. Test text here, lots of lines of
            relevant text.
          </Text>
          <Text>
            Test text here, lots of lines of relevant text. This is an example
            of text.
          </Text>
        </Modal>
      </View>
    </>
  );
};

export default App;
