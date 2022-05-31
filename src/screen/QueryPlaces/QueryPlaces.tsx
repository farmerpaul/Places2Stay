import React, {useContext, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';

import {colors} from '/theme';
import {PlacesFilterContext} from '/context';
import {Text} from '/component/base';

export type QueryPlacesProps = {
  route: RouteProp<any>;
  navigation: NativeStackNavigationProp<any>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.yellow,
    flex: 1,
  },
  animView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottie: {
    width: 300,
    height: 300,
    marginHorizontal: 'auto',
    marginBottom: 64,
  },
});

const QueryPlaces: React.FC<QueryPlacesProps> = ({navigation}) => {
  const {
    city: [city],
  } = useContext(PlacesFilterContext);

  const progress = useSharedValue(0.05);
  const fade = useSharedValue(0);
  const scale = useSharedValue(0.8);

  /* Set up Lottie to work with reanimated.
  =================================================== */
  const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);
  const progressProps = useAnimatedProps(() => ({
    progress: progress.value,
  }));

  /* Set up animated style for transitions.
  =================================================== */
  const fadeStyle = useAnimatedStyle(() => ({
    opacity: withTiming(fade.value, {
      duration: 600,
    }),
  }));
  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  /* Effects
  =================================================== */
  // Once screen gains focus, start animation while pausing for a duration to
  // simulate querying, then navigate to the next screen.
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setTimeout(() => {
        // Start fade/scale-in.
        fade.value = 1;
        scale.value = withDelay(
          100,
          withSpring(1, {
            mass: 2.25,
            stiffness: 275,
            restDisplacementThreshold: 0.002,
          }),
        );
        // Start Lottie animation.
        progress.value = withTiming(1, {duration: 16000});

        // Wait 6 seconds, then navigate to home.
        setTimeout(() => {
          // Start fade/scale-out.
          fade.value = 0;
          scale.value = withTiming(0.5, {duration: 600});
          // Navigate to home after transition.
          setTimeout(() => navigation.navigate('HomeTabs'), 600);
        }, 6000);
      }, 400);
    });

    return unsubscribe;
  }, [navigation, progress, fade, scale]);

  /* Render component.
  =================================================== */
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animView, fadeStyle]}>
        <Animated.View style={scaleStyle}>
          <AnimatedLottieView
            source={require('/asset/lottie/loading.json')}
            animatedProps={progressProps}
            style={styles.lottie}
          />
        </Animated.View>
        <Text variant="title" textAlign="center">
          Finding Places in {city}…
        </Text>
      </Animated.View>
    </View>
  );
};

export default QueryPlaces;
