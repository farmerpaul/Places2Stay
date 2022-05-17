import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {PlaceCta, SectionHeader} from './component';
import IconHome from '/asset/svg/icon-home.svg';
import IconCalendar from '/asset/svg/icon-calendar.svg';

import {Place} from './Home.types';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF1D2',
    flex: 1,
  },
  list: {
    paddingTop: 36,
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
  navBar: {
    backgroundColor: '#FFF8E8',
    borderColor: '#E9E5DC',
    borderTopWidth: 1,
    paddingTop: 12,
    paddingBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  navBarButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Home: React.FC = () => {
  const items: Array<Place> = [
    {
      title: '408 St. Jacques | 1 Br',
      location: 'Old Montreal, Montreal',
      imageSource: require('/asset/images/cta-placeholder.jpg'),
      price: 126,
    },
    {
      title: '408 St. Jacques | 1 Br',
      location: 'Old Montreal, Montreal',
      imageSource: require('/asset/images/cta-placeholder.jpg'),
      price: 126,
    },
    {
      title: '408 St. Jacques | 1 Br',
      location: 'Old Montreal, Montreal',
      imageSource: require('/asset/images/cta-placeholder.jpg'),
      price: 126,
    },
    {
      title: '408 St. Jacques | 1 Br',
      location: 'Old Montreal, Montreal',
      imageSource: require('/asset/images/cta-placeholder.jpg'),
      price: 126,
    },
  ];

  return (
    <>
      <SafeAreaView style={styles.container}>
        <TextInput
          placeholder="Try ‘Boston’"
          placeholderTextColor="#858585"
          style={styles.searchInput}
        />
        <FlatList<Place>
          style={styles.list}
          data={items}
          ListHeaderComponent={
            <SectionHeader
              title="Find your getaway"
              paragraph="Our spaces are designed for comfort – whether you are working, relaxing, or craving some spaces"
            />
          }
          renderItem={({item: {imageSource, price, title, location}}) => (
            <PlaceCta
              imageSource={imageSource}
              imageLabel={`From $${price}`}
              title={title}
              subtitle={location}
            />
          )}
        />
      </SafeAreaView>
      <View style={styles.navBar}>
        <View style={styles.navBarButton}>
          <IconHome />
        </View>
        <View style={styles.navBarButton}>
          <IconCalendar />
        </View>
      </View>
    </>
  );
};

export default Home;
