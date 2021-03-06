import React, {useContext, useEffect, useRef} from 'react';
import {
  Animated as RNAnimated,
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
import Animated, {BounceInDown, BounceOutDown} from 'react-native-reanimated';

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
    backgroundColor: colors.yellow,
    paddingBottom: 4,
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
    paddingVertical: 2,
    paddingLeft: spacing.gutter,
  },
  gradient: {
    position: 'absolute',
    left: spacing.gutter,
    right: spacing.gutter,
    height: 24,
  },
  gradientTop: {
    top: '100%',
    marginTop: 4,
  },
  gradientBottom: {
    bottom: 0,
  },
});

const Home: React.FC<HomeProps> = ({navigation}) => {
  const {
    city: [city, setCity],
  } = useContext(PlacesFilterContext);

  const listRef = useRef<FlatList>(null);
  const {width} = useWindowDimensions();
  const scrollPosition = useRef(new RNAnimated.Value(0)).current;

  /* Effects.
  =================================================== */
  // Scroll to the top of the list whenever city filter changes.
  useEffect(() => {
    listRef.current?.scrollToOffset({offset: 0, animated: true});
  }, [city]);

  /* Event handlers
  =================================================== */
  const showSearchModal = () => navigation.navigate('SearchStack');

  /* Render screen.
  =================================================== */
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <RNAnimated.View
        style={[
          styles.searchInputContainer,
          {
            top: scrollPosition.interpolate({
              inputRange: [0, 64],
              outputRange: [0, -32],
              extrapolateRight: 'clamp',
            }),
          },
        ]}>
        <View style={styles.searchInput}>
          <LinearGradient
            colors={[colors.yellow, colors.yellowTransparent]}
            style={[styles.gradient, styles.gradientTop]}
          />
          <SearchInput
            onKeyPress={showSearchModal}
            onPressIn={showSearchModal}
            value={city}
            onPressClear={() => setCity(undefined)}
          />
        </View>
      </RNAnimated.View>
      <View style={styles.list}>
        <RNAnimated.FlatList
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
              onPress={() => {
                navigation.navigate('HomeTabs', {screen: 'Stay'});
              }}
            />
          )}
          onScroll={RNAnimated.event(
            [{nativeEvent: {contentOffset: {y: scrollPosition}}}],
            {useNativeDriver: false},
          )}
        />
        {!city && (
          <LinearGradient
            colors={[colors.yellowTransparent, colors.yellow]}
            style={[styles.gradient, styles.gradientBottom]}
          />
        )}
      </View>
      {
        // Hide cities section if filter is active.
        !city && (
          <Animated.View
            entering={BounceInDown.duration(400)}
            exiting={BounceOutDown.duration(400)}>
            <SectionHeader title={data.sections.cityCtas.title} />
            <Carousel
              data={data.sections.cityCtas.places}
              renderItem={({item}) => (
                <CityCta
                  imageSource={item.image}
                  title={item.title}
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
          </Animated.View>
        )
      }
    </SafeAreaView>
  );
};

export default Home;
