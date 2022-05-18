import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {Text} from '/component/base';

export type Props = {
  style?: StyleProp<ViewStyle>;
  imageSource: ImageSourcePropType;
  title: string;
};

const styles = StyleSheet.create({
  container: {
    marginRight: 24,
  },
  image: {
    borderRadius: 8,
    width: 120,
    height: 160,
  },
  title: {
    marginTop: 8,
  },
});

const CityCta: React.FC<Props> = ({style, imageSource, title}) => {
  return (
    <View style={[styles.container, style]}>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default CityCta;
