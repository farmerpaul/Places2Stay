/**
 * MetaLab React Native Training - Places2Stay App
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import SectionHeader from '/screen/Home/component/SectionHeader';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF1D2',
    flex: 1,
  },
  inner: {
    paddingVertical: 16,
  },
});

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        //contentInsetAdjustmentBehavior="automatic"
        style={styles.inner}>
        <SectionHeader
          title="Find your getaway"
          paragraph="Our spaces are designed for comfort – whether you are working, relaxing, or craving some spaces"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
