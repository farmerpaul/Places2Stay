import React from 'react';
import {WebView, WebViewProps} from 'react-native-webview';

import {Modal} from '/component/base';
import {ModalProps} from '/component/base/Modal/Modal';

export type WebViewModalProps = WebViewProps & ModalProps;

const WebViewModal: React.FC<WebViewModalProps> = ({
  visible,
  setVisible,
  accessibilityLabel,
  ...rest
}) => {
  return (
    <Modal
      visible={visible}
      setVisible={setVisible}
      accessibilityLabel={accessibilityLabel}>
      <WebView {...rest} />
    </Modal>
  );
};

export default WebViewModal;
