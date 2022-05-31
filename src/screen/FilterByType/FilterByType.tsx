import React, {useCallback, useContext, useState} from 'react';
import {RouteProp, useFocusEffect} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {FlowStep} from '/component/partial';
import {Icon} from '/component/base';
import {PlacesFilterContext} from '/context';
import {StayType} from '/context/PlacesFilterContext/PlacesFilterContext';

import {TypeButton} from './component';

export type FilterByTypeProps = {
  route: RouteProp<any>;
  navigation: NativeStackNavigationProp<any>;
};

const FilterByType: React.FC<FilterByTypeProps> = ({navigation, route}) => {
  const {
    city: [city, setCity],
    stayType: [, setStayType],
  } = useContext(PlacesFilterContext);

  const [selected, setSelected] = useState<string>();

  /* Effects.
  =================================================== */
  // Set city if route called with city param.
  useFocusEffect(
    useCallback(() => {
      route.params?.city && setCity(route.params.city);
      setSelected(undefined);
    }, [route, setCity]),
  );

  /* Event handlers.
  =================================================== */
  const onPressType = (type: StayType) => {
    setStayType(type);
    navigation.navigate('FilterByDate');
  };

  /* Render component.
  =================================================== */
  return (
    <FlowStep navigation={navigation} title={city}>
      <TypeButton
        title="Find a place to stay"
        isSelected={selected === 'shortTerm'}
        onPress={() => onPressType('shortTerm')}
        onPressIn={() => setSelected('shortTerm')}
        icon={
          <Icon svg={require('/asset/svg/map.svg')} width="40" height="40" />
        }
      />
      <TypeButton
        title="Find a monthly stay"
        isSelected={selected === 'longTerm'}
        onPress={() => onPressType('longTerm')}
        onPressIn={() => setSelected('longTerm')}
        icon={
          <Icon svg={require('/asset/svg/house.svg')} width="40" height="40" />
        }
      />
      <TypeButton
        title="Find an experience"
        isSelected={selected === 'experience'}
        onPress={() => onPressType('experience')}
        onPressIn={() => setSelected('experience')}
        icon={
          <Icon svg={require('/asset/svg/cheers.svg')} width="40" height="40" />
        }
      />
    </FlowStep>
  );
};

export default FilterByType;
