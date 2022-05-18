import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import {PlaceCta, SectionHeader} from './component';
import IconHome from '/asset/svg/icon-home.svg';
import IconCalendar from '/asset/svg/icon-calendar.svg';
import data from '/fixtures/homeData';
import Carousel from 'react-native-snap-carousel';
import CityCta from '/screen/Home/component/CityCta';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF1D2',
    flex: 1,
  },
  list: {
    paddingTop: 24,
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
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  navBarButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cityCtaCarousel: {
    minHeight: 200,
    paddingBottom: 16,
  },
  cityCtaSlide: {
    position: 'relative',
    left: 50,
  },
});

const Home: React.FC = () => {
  const {width} = useWindowDimensions();

  return (
    <>
      <SafeAreaView style={styles.container}>
        <TextInput
          placeholder="Try ‘Boston’"
          placeholderTextColor="#858585"
          style={styles.searchInput}
        />
        <FlatList
          style={styles.list}
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
