import React from 'react';
import {
  Image,
  Modal as RNModal,
  ModalProps as RNModalProps,
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
  modal: {
    flex: 1,
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
  ...rest
}) => {
  const closeModal = () => setVisible(false);

  return (
    <RNModal
      visible={visible}
      accessible
      accessibilityLabel={accessibilityLabel}
      animationType="slide"
      transparent
      onRequestClose={closeModal}
      {...rest}>
      {!fullscreen && (
        <>
          <BlurView intensity={15} style={styles.overlay}>
            <LinearGradient
              colors={[colors.blue, colors.blueTransparent]}
              style={styles.overlay}
            />
          </BlurView>
          {!!overlayHeading && (
            <SafeAreaView>
              <View style={styles.overlayHeading}>
                <Text variant="title" color="white">
                  {overlayHeading}
                </Text>
              </View>
            </SafeAreaView>
          )}
        </>
      )}
      <SafeAreaView
        style={[styles.modal, fullscreen && styles.modalFullscreen, style]}>
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
      </SafeAreaView>
    </RNModal>
  );
};

export default Modal;
