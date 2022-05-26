import React, {useRef} from 'react';
import {Animated, StyleSheet, useWindowDimensions, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';

import data from '../../fixtures/home';
import {colors, spacing} from '/theme';
import {SearchInput} from '/component/partial';

import {CityCta, PlaceCta, SectionHeader} from './component';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationProp} from '@react-navigation/native';

export type HomeProps = {
  navigation: NavigationProp<any, any>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.yellow,
    flex: 1,
  },
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
    bottom: 0,
  },
});

const Home: React.FC<HomeProps> = ({navigation}) => {
  const {width} = useWindowDimensions();

  const scrollPosition = useRef(new Animated.Value(0)).current;

  /* Event handlers
  =================================================== */
  const showSearchModal = () => navigation.navigate('SearchStack');

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
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
          style={styles.gradient}
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
              imageLabel={item.imageLabel}
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
    </SafeAreaView>
  );
};

export default Home;
