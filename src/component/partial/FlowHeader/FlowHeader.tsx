import React, {useRef} from 'react';
import {
  Animated,
  PanResponder,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {colors, spacing} from '/theme';
import {Text} from '/component/base';
import {SafeAreaView} from 'react-native-safe-area-context';

export type FlowHeaderProps = {
  title: string;
};

const MIN_POSITION = 0;
const MAX_POSITION = 144;

const styles = StyleSheet.create({
  container: {
    height: MAX_POSITION,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
  },
  title: {
    paddingTop: 44,
    paddingHorizontal: spacing.gutter,
  },
  handleContainer: {
    minHeight: 16,
    backgroundColor: colors.yellow,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  handle: {
    position: 'absolute',
    left: '50%',
    top: 6,
    padding: 20,
    marginTop: -20,
    marginLeft: -48,
  },
  handleInner: {
    height: 4,
    width: 56,
    backgroundColor: colors.blue,
    borderRadius: 4,
  },
});

const FlowHeader: React.FC<FlowHeaderProps> = ({title}) => {
  const {height: windowHeight} = useWindowDimensions();
  const positionAnim = useRef(new Animated.Value(MAX_POSITION)).current;

  /*
  TODO: Get this working - using state variable to track current value

  const [position, setPosition] = useState(MAX_POSITION);

  useEffect(() => {
    positionAnim.addListener(({value}) => {
      setPosition(value);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  */

  const getPosition = () => {
    // TODO: Get this working: using state (above) to get current position,
    // instead of using private property.
    // return position;
    return (positionAnim as any)._value;
  };

  /**
   * Springs the header to the given position.
   */
  const springToPosition = (newPosition: number) => {
    Animated.spring(positionAnim, {
      toValue: newPosition,
      bounciness: 11,
      speed: 16,
      useNativeDriver: false,
    }).start();
  };

  /**
   * Toggle between minimum and maximum positions.
   */
  const togglePosition = () => {
    springToPosition(
      getPosition() === MIN_POSITION ? MAX_POSITION : MIN_POSITION,
    );
  };

  /**
   * Define pan responder.
   */
  const panResponder = useRef(
    PanResponder.create({
      //onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        positionAnim.extractOffset();
      },
      onPanResponderMove: (_event, {dy}) => {
        positionAnim.setValue(dy);
      },
      onPanResponderRelease: () => {
        positionAnim.flattenOffset();
        // Spring to the top or bottom, depending on which is closer.
        springToPosition(
          getPosition() / (MAX_POSITION - MIN_POSITION) < 0.5
            ? MIN_POSITION
            : MAX_POSITION,
        );
      },
    }),
  ).current;

  /* Render component.
  =================================================== */
  return (
    <SafeAreaView edges={['top']}>
      <LinearGradient
        colors={[colors.blue, colors.white]}
        style={[styles.overlay, {height: windowHeight}]}
      />
      <Animated.View
        style={[
          styles.container,
          {
            marginBottom: positionAnim.interpolate({
              inputRange: [MIN_POSITION, MAX_POSITION],
              outputRange: [-MAX_POSITION, MIN_POSITION],
            }),
          },
        ]}>
        <Animated.View
          style={[
            styles.title,
            {
              opacity: positionAnim.interpolate({
                inputRange: [MIN_POSITION + 40, MAX_POSITION],
                outputRange: [0, 1],
                extrapolate: 'clamp',
              }),
            },
          ]}>
          <Text variant="title" color="white">
            {title}
          </Text>
        </Animated.View>
      </Animated.View>
      <View {...panResponder.panHandlers} style={styles.handleContainer}>
        <Pressable style={styles.handle} onPress={togglePosition}>
          <View style={styles.handleInner} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default FlowHeader;
