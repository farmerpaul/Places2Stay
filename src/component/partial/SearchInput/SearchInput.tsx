import React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import {colors, spacing} from '/theme';

export type SearchInputProps = TextInputProps & {
  value?: string;
};

const styles = StyleSheet.create({
  searchInput: {
    marginHorizontal: spacing.gutter,
    marginTop: 16,
    padding: 18,
    color: colors.black,
    backgroundColor: colors.white,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 20,
    borderColor: 'rgba(0, 0, 0, 0.19)',
    borderWidth: 1,
    borderRadius: 100,
    shadowColor: colors.black,
    shadowOpacity: 0.19,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    zIndex: 1,
  },
});

const SearchInput = React.forwardRef<TextInput, SearchInputProps>(
  ({value, style, ...rest}, ref) => {
    return (
      <TextInput
        ref={ref}
        accessibilityLabel="Search cities"
        placeholder="Try ‘Boston’"
        placeholderTextColor="#858585"
        style={[styles.searchInput, style]}
        value={value}
        {...rest}
      />
    );
  },
);

export default SearchInput;
