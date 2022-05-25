import React, {useContext} from 'react';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {FlowStep} from '/component/partial';
import {PlacesFilterContext} from '/context';

export type FilterByTypeProps = {
  route: RouteProp<any>;
  navigation: NativeStackNavigationProp<any>;
  onSelect?: (value: string) => void;
};

const FilterByType: React.FC<FilterByTypeProps> = ({navigation}) => {
  const filterContext = useContext(PlacesFilterContext);

  return <FlowStep navigation={navigation} title={filterContext.city} />;
};

export default FilterByType;
