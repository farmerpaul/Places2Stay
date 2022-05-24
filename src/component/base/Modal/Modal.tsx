import React, {useRef} from 'react';
import {
  Animated,
  Image,
  Modal as RNModal,
  ModalProps as RNModalProps,
  PanResponder,
  Pressable,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BlurView} from 'expo-blur';

import {colors, spacing} from '/theme';
import {Text} from '/component/base';

export type ModalProps = RNModalProps & {
  visible: boolean;
  /**
   * Function used by parent component to change visibility state (should toggle
   * the value of the `visible` prop).
   */
  setVisible: (visible: boolean) => void;
  /**
   * Whether the modal should fill the screen.
   *
   * @default false
   */
  fullscreen?: boolean;
  /**
   * Header text to display over top of the blue overlay above the modal. Not
   * applicable if fullscreen.
   */
  overlayHeading?: string;
  /**
   * Title to appear at the top of the modal beside the back button.
   */
  title?: string;
  /**
   * Desription of modal.
   *
   * @default 'Modal'
   */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  closeButtonStyle?: StyleProp<ViewStyle>;
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlayHeading: {
    paddingVertical: 44,
    paddingHorizontal: spacing.gutter,
    minHeight: 140,
  },
  animView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modal: {
    flex: 1,
    marginBottom: -40,
    paddingBottom: 40,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: colors.yellow,
  },
  modalFullscreen: {
    borderRadius: 0,
  },
  modalInner: {
    margin: spacing.gutter,
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
    backgroundColor: colors.grey,
    borderRadius: 4,
  },
  closeButton: {
    position: 'absolute',
    left: -10,
    top: -10,
    padding: 10,
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  title: {
    marginHorizontal: 32,
    marginBottom: 24,
  },
});

const Modal: React.FC<ModalProps> = ({
  visible,
  setVisible,
  fullscreen = false,
  overlayHeading,
  title,
  accessibilityLabel = 'Modal',
  children,
  style,
  closeButtonStyle,
  onDismiss,
  ...rest
}) => {
  const MAX_POSITION = 150;
  const closeModal = () => setVisible(false);
  const positionAnim = useRef(new Animated.Value(MAX_POSITION)).current;

  /*
  TODO: Get this working - using state variable to track current value

  const [position, setPosition] = useState(MAX_POSITION);

  useEffect(() => {
    positionAnim.addListener(({value}) => {
      console.log('setting', value);
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

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => positionAnim.extractOffset(),
      onPanResponderMove: (_event, {dy}) => positionAnim.setValue(dy),
      onPanResponderRelease: () => {
        positionAnim.flattenOffset();

        Animated.spring(positionAnim, {
          toValue: Math.min(Math.max(getPosition(), 0), MAX_POSITION),
          bounciness: 12,
          speed: 50,
          useNativeDriver: false,
        }).start();
      },
    }),
  ).current;

  const togglePosition = () => {
    Animated.timing(positionAnim, {
      toValue: getPosition() === 0 ? MAX_POSITION : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  return (
    <RNModal
      visible={visible}
      accessible
      accessibilityLabel={accessibilityLabel}
      animationType="slide"
      transparent
      onDismiss={() => {
        positionAnim.setValue(150);
        onDismiss?.();
      }}
      onRequestClose={closeModal}
      {...rest}>
      {!fullscreen && (
        <>
          <BlurView intensity={15} style={styles.overlay}>
            <LinearGradient
              colors={[colors.blue, colors.blueTransparent]}
              style={styles.overlay}
            />
            {!!overlayHeading && (
              <SafeAreaView>
                <View style={styles.overlayHeading}>
                  <Text variant="title" color="white">
                    {overlayHeading}
                  </Text>
                </View>
              </SafeAreaView>
            )}
          </BlurView>
        </>
      )}
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Animated.View
            style={[
              styles.animView,
              !fullscreen && {
                top: positionAnim,
              },
            ]}>
            <View
              style={[
                styles.modal,
                fullscreen && styles.modalFullscreen,
                style,
              ]}>
              {!fullscreen && (
                <View {...panResponder.panHandlers}>
                  <Pressable style={styles.handle} onPress={togglePosition}>
                    <View style={styles.handleInner} />
                  </Pressable>
                </View>
              )}

              <View style={styles.modalInner}>
                <Pressable
                  onPress={closeModal}
                  accessibilityLabel="Close modal"
                  style={[styles.closeButton, closeButtonStyle]}>
                  <Image
                    accessibilityElementsHidden
                    source={require('/asset/images/back.png')}
                    style={styles.closeIcon}
                  />
                </Pressable>
                {!!title && (
                  <Text variant="base" textAlign="center" style={styles.title}>
                    {title}
                  </Text>
                )}
                {children}
              </View>
            </View>
          </Animated.View>
        </View>
      </SafeAreaView>
    </RNModal>
  );
};

export default Modal;
