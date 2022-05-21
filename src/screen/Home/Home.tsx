import React, {useRef, useState} from 'react';
import {Animated, StyleSheet, useWindowDimensions, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';

import data from '../../fixtures/home';
import {colors, spacing} from '/theme';
import {SearchInput, SearchModal} from '/component/partial';

import {CityCta, PlaceCta, SectionHeader} from './component';

const styles = StyleSheet.create({
  searchInputContainer: {
    zIndex: 10,
    marginTop: 16,
  },
  searchInput: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  list: {
    flex: 1,
    marginTop: 16,
  },
  listHeader: {
    marginTop: 80,
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
  gradientBottom: {
    bottom: 0,
  },
});

const Home: React.FC = () => {
  const {width} = useWindowDimensions();
  const [searchModalVisible, setSearchModalVisible] = useState(false);

  const scrollPosition = useRef(new Animated.Value(0)).current;

  /* Event handlers
  =================================================== */
  const showSearchModal = () => setSearchModalVisible(true);

  return (
    <>
      <Animated.View
        style={[
          styles.searchInputContainer,
          {
            top: scrollPosition.interpolate({
              inputRange: [0, 32],
              outputRange: [0, -32],
              extrapolate: 'clamp',
            }),
          },
        ]}>
        <SearchInput
          onKeyPress={showSearchModal}
          onPressIn={showSearchModal}
          style={styles.searchInput}
        />
      </Animated.View>
      <View style={styles.list}>
        <Animated.FlatList
          data={data.sections.placeCtas.places}
          ListHeaderComponent={
            <SectionHeader
              title={data.sections.placeCtas.title}
              paragraph={data.sections.placeCtas.description}
              style={styles.listHeader}
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
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollPosition}}}],
            {useNativeDriver: false},
          )}
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
