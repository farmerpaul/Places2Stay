import React, {useEffect, useRef} from 'react';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';

import {Animated, StyleSheet, View} from 'react-native';
import {colors} from '/theme';
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
  const fade = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(0)).current;

  /* Effects
  =================================================== */
  // Once screen gains focus, start animation while pausing for a duration to
  // simulate querying, then navigate to the next screen.
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 20000,
      useNativeDriver: false,
    }).start();
    Animated.timing(fade, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    const unsubscribe = navigation.addListener('focus', () => {
      setTimeout(() => {
        Animated.timing(fade, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }).start(() => navigation.navigate('Home'));
      }, 8000);
    });

    return unsubscribe;
  }, [navigation, progress, fade]);

  /* Render component.
  =================================================== */
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animView, {opacity: fade}]}>
        <LottieView
          source={require('/asset/lottie/loading.json')}
          progress={progress}
          style={styles.lottie}
        />
        <Text variant="title" textAlign="center">
          Finding Places…
        </Text>
      </Animated.View>
    </View>
  );
};

export default QueryPlaces;
