import {ImageSourcePropType} from 'react-native';

export type Place = {
  title: string;
  location: string;
  imageSource: ImageSourcePropType;
  price: number;
};
