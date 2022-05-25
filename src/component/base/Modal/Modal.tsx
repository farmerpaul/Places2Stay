import React from 'react';
import {
  Modal as RNModal,
  ModalProps as RNModalProps,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import {colors} from '/theme';

export type ModalProps = RNModalProps & {
  visible: boolean;
  /**
   * Function used by parent component to change visibility state (should toggle
   * the value of the `visible` prop).
   */
  setVisible: (visible: boolean) => void;
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
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: colors.yellow,
  },
});

const Modal: React.FC<ModalProps> = ({
  visible,
  setVisible,
  accessibilityLabel = 'Modal',
  children,
  style,
  onDismiss,
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
      onDismiss={onDismiss}
      onRequestClose={closeModal}
      {...rest}>
      <SafeAreaView style={{flex: 1}}>
        <View style={[styles.modal, style]}>{children}</View>
      </SafeAreaView>
    </RNModal>
  );
};

export default Modal;
