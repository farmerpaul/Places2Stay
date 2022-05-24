import React, {useEffect, useRef, useState} from 'react';
import {Pressable, StyleSheet, TextInput} from 'react-native';

import {Icon, Modal, Text} from '/component/base';
import {ModalProps} from '/component/base/Modal/Modal';
import {SearchInput} from '/component/partial';
import searchMockData from '/fixtures/search';
import {colors} from '/theme';

export type Props = ModalProps & {
  onSelect?: (value: string) => void;
};

const styles = StyleSheet.create({
  searchInput: {
    marginTop: -16,
    marginLeft: 40,
    marginRight: 0,
  },
  title: {
    marginTop: 24,
    marginBottom: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  optionIcon: {
    marginRight: 8,
  },
});

const SearchModal: React.FC<Props> = ({onSelect, setVisible, ...rest}) => {
  const inputRef = useRef<TextInput>(null);
  const [searchText, setSearchText] = useState('');
  const options = searchMockData.cities;
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);

  /* Effects
  =================================================== */
  // Filter list when search text changes.
  useEffect(() => {
    if (searchText) {
      setFilteredOptions(
        searchText
          ? options.filter(option =>
              option.toUpperCase().includes(searchText.toUpperCase()),
            )
          : options,
      );
    } else {
      // Else set it to all options.
      setFilteredOptions(options);
    }
  }, [searchText, options]);

  /* Event handlers.
  =================================================== */
  // Focus search input when modal is displayed.
  const onModalShow = () => {
    inputRef.current?.focus();
  };

  // Clear search text when modal is closed.
  const onModalDismiss = () => {
    setSearchText('');
  };

  // Trigger selection event handler and close modal.
  const onSelectItem = (value: string) => {
    onSelect?.(value);
    setVisible(false);
  };

  return (
    <Modal
      accessibilityLabel="Search for a city"
      fullscreen
      onShow={onModalShow}
      onDismiss={onModalDismiss}
      setVisible={setVisible}
      {...rest}>
      <SearchInput
        ref={inputRef}
        value={searchText}
        onChangeText={setSearchText}
        style={styles.searchInput}
      />
      <Text variant="title" style={styles.title}>
        Getaways Near You
      </Text>
      {filteredOptions.map(option => (
        <Pressable
          key={option}
          onPress={() => onSelectItem(option)}
          style={styles.option}>
          <Icon
            svg={require('/asset/svg/map-marker.svg')}
            color={colors.blue}
            style={styles.optionIcon}
          />
          <Text variant="base">{option}</Text>
        </Pressable>
      ))}
    </Modal>
  );
};

export default SearchModal;
