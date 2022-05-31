import React from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';

import {colors, spacing} from '/theme';
import {Icon, Pressable} from '/component/base';
import {FadeIn, FadeOut} from 'react-native-reanimated';

export type SearchInputProps = TextInputProps & {
  value?: string;
  onPressClear?: () => void;
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginHorizontal: spacing.gutter,
    zIndex: 1,
  },
  searchInput: {
    paddingVertical: 18,
    paddingHorizontal: 44,
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
  },
  searchIcon: {
    position: 'absolute',
    top: 16,
    left: 12,
  },
  clearButtonPosition: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  clearButton: {
    padding: 3,
    backgroundColor: colors.yellowDeep,
    borderRadius: 24,
  },
});

const SearchInput = React.forwardRef<TextInput, SearchInputProps>(
  ({value, style, onPressClear, ...rest}, ref) => {
    return (
      <View style={[styles.container, style]}>
        <TextInput
          ref={ref}
          accessibilityLabel="Search cities"
          placeholder="Try ‘Boston’"
          placeholderTextColor="#858585"
          style={[styles.searchInput]}
          value={value}
          {...rest}
        />
        <Icon
          svg={require('/asset/svg/search.svg')}
          width="28"
          height="28"
          style={styles.searchIcon}
          color={colors.grey}
        />
        {!!value && (
          <Pressable
            onPress={onPressClear}
            scale={0.9}
            positionStyle={styles.clearButtonPosition}
            style={styles.clearButton}
            entering={FadeIn.duration(300)}
            exiting={FadeOut.duration(300)}>
            <Icon
              svg={require('/asset/svg/close.svg')}
              width={22}
              height={22}
              color={colors.white}
            />
          </Pressable>
        )}
      </View>
    );
  },
);

export default SearchInput;
