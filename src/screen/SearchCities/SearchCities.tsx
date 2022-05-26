import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {Pressable, StyleSheet, TextInput} from 'react-native';

import {Icon, Text} from '/component/base';
import {FlowStep, SearchInput} from '/component/partial';
import {PlacesFilterContext} from '/context';
import searchMockData from '/fixtures/search';
import {colors} from '/theme';

export type SearchCitiesProps = {
  route: RouteProp<any>;
  navigation: NativeStackNavigationProp<any>;
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

const SearchCities: React.FC<SearchCitiesProps> = ({navigation}) => {
  const filterContext = useContext(PlacesFilterContext);
  const inputRef = useRef<TextInput>(null);
  const [searchText, setSearchText] = useState('');
  const options = searchMockData.cities;
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);

  /* Effects
  =================================================== */
  // Focus search input when screen gains focus.
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      inputRef.current?.focus();
    });

    return unsubscribe;
  }, [navigation]);

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
  // Trigger selection event handler and move to next screen.
  const onSelectItem = (value: string) => {
    filterContext.city = value;
    navigation.push('FilterByType');
  };

  return (
    <FlowStep navigation={navigation} safeArea>
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
    </FlowStep>
  );
};

export default SearchCities;
