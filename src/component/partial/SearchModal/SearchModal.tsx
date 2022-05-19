import React, {useRef, useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';

import {Modal} from '/component/base';
import {ModalProps} from '/component/base/Modal/Modal';
import {SearchInput} from '/component/partial';

export type Props = ModalProps & {
  onSelect?: (result: string) => void;
};

const styles = StyleSheet.create({
  input: {
    marginLeft: 72,
  },
});

const SearchModal: React.FC<Props> = ({onSelect: _onSelect, ...rest}) => {
  const ref = useRef<TextInput>(null);
  const [value, setValue] = useState('');

  return (
    <Modal
      accessibilityLabel="Search for a city"
      animationType="fade"
      onShow={() => ref.current?.focus()}
      {...rest}>
      <SearchInput
        ref={ref}
        value={value}
        onChangeText={setValue}
        style={styles.input}
      />
    </Modal>
  );
};

export default SearchModal;
