import React, {useContext} from 'react';
import {RouteProp} from '@react-navigation/native';
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

const FilterByType: React.FC<FilterByTypeProps> = ({navigation}) => {
  const {
    city: [city],
    stayType: [, setStayType],
  } = useContext(PlacesFilterContext);

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
        onPress={() => onPressType('shortTerm')}
        icon={
          <Icon svg={require('/asset/svg/map.svg')} width="40" height="40" />
        }
      />
      <TypeButton
        title="Find a monthly stay"
        onPress={() => onPressType('longTerm')}
        icon={
          <Icon svg={require('/asset/svg/house.svg')} width="40" height="40" />
        }
      />
      <TypeButton
        title="Find an experience"
        onPress={() => onPressType('experience')}
        icon={
          <Icon svg={require('/asset/svg/cheers.svg')} width="40" height="40" />
        }
      />
    </FlowStep>
  );
};

export default FilterByType;
