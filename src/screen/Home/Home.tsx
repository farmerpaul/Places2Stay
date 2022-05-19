import React, {useState} from 'react';
import {FlatList, StyleSheet, useWindowDimensions, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';

import data from '../../fixtures/home';
import {colors, spacing} from '/theme';
import {SearchInput, SearchModal} from '/component/partial';

import {CityCta, PlaceCta, SectionHeader} from './component';

const styles = StyleSheet.create({
  list: {
    flex: 1,
    marginTop: 8,
  },
  cityCtaCarousel: {
    paddingBottom: 16,
  },
  cityCtaSlide: {
    position: 'relative',
    left: spacing.gutter,
  },
  gradient: {
    position: 'absolute',
    left: spacing.gutter,
    right: spacing.gutter,
    height: 24,
  },
  gradientTop: {
    top: 0,
  },
  gradientBottom: {
    bottom: 0,
  },
});

const Home: React.FC = () => {
  const {width} = useWindowDimensions();
  const [searchModalVisible, setSearchModalVisible] = useState(false);

  const showSearchModal = () => setSearchModalVisible(true);

  return (
    <>
      <SearchInput onKeyPress={showSearchModal} onPressIn={showSearchModal} />
      <View style={styles.list}>
        <FlatList
          data={data.sections.placeCtas.places}
          ListHeaderComponent={
            <SectionHeader
              title={data.sections.placeCtas.title}
              paragraph={data.sections.placeCtas.description}
            />
          }
          renderItem={({item}) => (
            <PlaceCta
              imageSource={item.image}
              imageLabel={item.imageLabel}
              title={item.title}
              subtitle={item.location}
            />
          )}
        />
        <LinearGradient
          colors={[colors.yellow, colors.yellowTransparent]}
          style={[styles.gradient, styles.gradientTop]}
        />
        <LinearGradient
          colors={[colors.yellowTransparent, colors.yellow]}
          style={[styles.gradient, styles.gradientBottom]}
        />
      </View>
      <View>
        <SectionHeader title={data.sections.cityCtas.title} />
        <Carousel
          data={data.sections.cityCtas.places}
          renderItem={({item}) => (
            <CityCta
              imageSource={item.image}
              title={item.title}
              style={styles.cityCtaSlide}
            />
          )}
          sliderWidth={width}
          itemWidth={144}
          activeSlideAlignment="start"
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
          containerCustomStyle={styles.cityCtaCarousel}
          removeClippedSubviews={false}
        />
      </View>
      <SearchModal
        visible={searchModalVisible}
        setVisible={setSearchModalVisible}
      />
    </>
  );
};

export default Home;
