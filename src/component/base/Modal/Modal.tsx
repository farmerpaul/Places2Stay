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
    opacity: 0.85,
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
    padding: spacing.gutter,
  },
  modalFullscreen: {
    borderRadius: 0,
  },
  closeButton: {
    position: 'absolute',
    left: spacing.gutter - 10,
    top: 22,
    padding: 10,
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
});

const Modal: React.FC<ModalProps> = ({
  visible,
  setVisible,
  fullscreen = false,
  overlayHeading,
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
          <LinearGradient
            colors={[colors.blue, colors.blueTransparent]}
            style={styles.overlay}
          />
          {!!overlayHeading && (
            <View style={styles.overlayHeading}>
              <Text variant="title" color="white">
                {overlayHeading}
              </Text>
            </View>
          )}
        </>
      )}
      <SafeAreaView
        style={[styles.modal, fullscreen && styles.modalFullscreen, style]}>
        <View>
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
          {children}
        </View>
      </SafeAreaView>
    </RNModal>
  );
};

export default Modal;
