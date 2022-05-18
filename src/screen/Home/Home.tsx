import React from 'react';
import {
  FlatList,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';

import data from '/fixtures/homeData';
import CityCta from '/screen/Home/component/CityCta';
import {colors, spacing} from '/theme';

import {PlaceCta, SectionHeader} from './component';

const styles = StyleSheet.create({
  list: {
    flex: 1,
    marginTop: 8,
  },
  searchInput: {
    marginHorizontal: spacing.gutter,
    marginTop: 16,
    padding: 18,
    color: colors.black,
    backgroundColor: colors.white,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 20,
    borderColor: 'rgba(0, 0, 0, 0.19)',
    borderWidth: 1,
    borderRadius: 100,
    shadowColor: colors.black,
    shadowOpacity: 0.19,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    zIndex: 1,
  },
  cityCtaCarousel: {
    paddingBottom: 16,
  },
  cityCtaSlide: {
    position: 'relative',
    left: 50,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
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

  return (
    <>
      <TextInput
        placeholder="Try ‘Boston’"
        placeholderTextColor="#858585"
        style={styles.searchInput}
      />
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
    </>
  );
};

export default Home;
