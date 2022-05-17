/**
 * MetaLab React Native Training - Places2Stay App
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, TextInput} from 'react-native';
import PlaceCta from '/screen/Home/component/PlaceCta';
import SectionHeader from '/screen/Home/component/SectionHeader';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF1D2',
    flex: 1,
  },
  scrollView: {
    paddingTop: 32,
    paddingBottom: 16,
    marginTop: -16,
  },
  searchInput: {
    marginHorizontal: 44,
    marginTop: 16,
    padding: 18,
    color: '#000',
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 20,
    borderColor: 'rgba(0, 0, 0, 0.19)',
    borderWidth: 1,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOpacity: 0.19,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    zIndex: 1,
  },
});

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Try ‘Boston’"
        placeholderTextColor="#858585"
        style={styles.searchInput}
      />
      <ScrollView style={styles.scrollView}>
        <SectionHeader
          title="Find your getaway"
          paragraph="Our spaces are designed for comfort – whether you are working, relaxing, or craving some spaces"
        />
        <PlaceCta
          imageSource={require('/asset/images/cta-placeholder.jpg')}
          imageLabel="From $126"
          title="408 St. Jacques | 1 Br"
          subtitle="Old Montreal, Montreal"
        />
        <PlaceCta
          imageSource={require('/asset/images/cta-placeholder.jpg')}
          imageLabel="From $126"
          title="408 St. Jacques | 1 Br"
          subtitle="Old Montreal, Montreal"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
