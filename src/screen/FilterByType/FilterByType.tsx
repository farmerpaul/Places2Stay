import React, {useContext} from 'react';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {PlacesFilterContext} from '/context';
import {FlowStep} from '/component/partial';

import {TypeButton} from './component';
import {Icon} from '/component/base';

export type FilterByTypeProps = {
  route: RouteProp<any>;
  navigation: NativeStackNavigationProp<any>;
  onSelect?: (value: string) => void;
};

const FilterByType: React.FC<FilterByTypeProps> = ({navigation}) => {
  const filterContext = useContext(PlacesFilterContext);

  /* Event handlers.
  =================================================== */
  const onPressType = (type: string) => {
    filterContext.type = type;
    navigation.navigate('FilterByDate');
  };

  /* Render component.
  =================================================== */
  return (
    <FlowStep navigation={navigation} title={filterContext.city}>
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
