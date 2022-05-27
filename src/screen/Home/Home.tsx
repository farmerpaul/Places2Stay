import React, {useContext, useEffect, useRef} from 'react';
import {
  Animated,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';

import data from '../../fixtures/home';
import {colors, spacing} from '/theme';
import {SearchInput} from '/component/partial';

import {CityCta, PlaceCta, SectionHeader} from './component';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationProp} from '@react-navigation/native';
import {PlacesFilterContext} from '/context';

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
  const {
    city: [city, setCity],
  } = useContext(PlacesFilterContext);

  const listRef = useRef<FlatList>(null);
  const {width} = useWindowDimensions();
  const scrollPosition = useRef(new Animated.Value(0)).current;

  /* Effects.
  =================================================== */
  // Scroll to the top of the list whenever city filter changes.
  useEffect(() => {
    listRef.current?.scrollToOffset({offset: 0, animated: false});
  }, [city]);

  /* Event handlers
  =================================================== */
  const showSearchModal = () => navigation.navigate('SearchStack');

  /* Render screen.
  =================================================== */
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
          value={city}
          onPressClear={() => setCity(undefined)}
        />
      </Animated.View>
      <View style={styles.list}>
        <Animated.FlatList
          ref={listRef}
          data={data.sections.placeCtas.places}
          ListHeaderComponent={
            <SectionHeader
              title={
                city ? `250+ Places in ${city}` : data.sections.placeCtas.title
              }
              paragraph={city ? undefined : data.sections.placeCtas.description}
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
        {!city && (
          <LinearGradient
            colors={[colors.yellowTransparent, colors.yellow]}
            style={styles.gradient}
          />
        )}
      </View>
      {
        // Hide cities section if filter is active.
        !city && (
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
                  onPress={() => {
                    // TODO: Timeout used here prevent home screen from being
                    // updated before modal appears.
                    //
                    // Really, this would all be done somewhat differently if
                    // real querying were used, making proper use of isLoading
                    // states, etc. (e.g., react-query).
                    setTimeout(() => setCity(item.title), 400);
                    navigation.navigate('SearchStack', {screen: 'QueryPlaces'});
                  }}
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
        )
      }
    </SafeAreaView>
  );
};

export default Home;
