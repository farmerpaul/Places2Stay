import React from 'react';
import {Text as RNText, TextStyle} from 'react-native';

export type Props = {
  style?: TextStyle;
};

const Text: React.FC<Props> = ({style, children}) => {
  return <RNText style={style}>{children}</RNText>;
};

export default Text;
