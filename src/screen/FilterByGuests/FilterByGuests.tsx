import React, {useContext, useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {FlowStep} from '/component/partial';
import {PlacesFilterContext} from '/context';
import {StyleSheet, View} from 'react-native';
import {colors} from '/theme';
import {Button, RangeInput, Text} from '/component/base';

export type FilterByGuestsProps = {
  route: RouteProp<any>;
  navigation: NativeStackNavigationProp<any>;
};

const styles = StyleSheet.create({
  row: {
    borderTopColor: colors.silver,
    borderTopWidth: 0.5,
    marginVertical: 8,
    paddingTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    marginBottom: 4,
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
});

const FilterByGuests: React.FC<FilterByGuestsProps> = ({navigation}) => {
  const filterContext = useContext(PlacesFilterContext);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);

  /* Event handlers.
  =================================================== */
  const onPressNext = () => {
    filterContext.adults = adults;
    filterContext.children = children;
    filterContext.infants = infants;
    filterContext.pets = pets;
    navigation.navigate('Home');
  };

  const onPressSkip = () => {
    navigation.navigate('Home');
  };

  /* Render component.
  =================================================== */
  const renderRow = (
    title: string,
    description: string,
    value: number,
    setValue: (value: number) => void,
  ) => (
    <View style={styles.row}>
      <View>
        <Text variant="base" style={styles.title}>
          {title}
        </Text>
        <Text color="muted">{description}</Text>
      </View>
      <RangeInput value={value} setValue={setValue} minValue={0} />
    </View>
  );

  return (
    <FlowStep navigation={navigation} title={filterContext.city}>
      {renderRow('Adults', 'Description', adults, setAdults)}
      {renderRow('Children', 'Description', children, setChildren)}
      {renderRow('Infants', 'Description', infants, setInfants)}
      {renderRow('Pets', 'Description', pets, setPets)}
      <View style={styles.bottomActions}>
        <Button label="Skip" variant="secondary" onPress={onPressSkip} />
        <Button label="Next" variant="primary" onPress={onPressNext} />
      </View>
    </FlowStep>
  );
};

export default FilterByGuests;
