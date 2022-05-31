import React, {memo} from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import {colors} from '/theme';
import {Pressable, Text} from '/component/base';

export type CityCtaProps = {
  style?: StyleProp<ViewStyle>;
  imageSource: ImageSourcePropType;
  title: string;
  imageLabel?: string;
  onPress?: () => void;
};

const styles = StyleSheet.create({
  container: {
    marginRight: 24,
  },
  imageContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  imageLabel: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.yellowDeep,
    borderBottomLeftRadius: 8,
  },
  image: {
    width: 120,
    height: 160,
  },
  title: {
    marginTop: 8,
  },
});

const CityCta: React.FC<CityCtaProps> = memo(
  ({style, imageSource, title, imageLabel, onPress}) => {
    return (
      <Pressable onPress={onPress} style={[styles.container, style]}>
        <View style={styles.imageContainer}>
          <Image source={imageSource} style={styles.image} />
          {!!imageLabel && (
            <View style={styles.imageLabel}>
              <Text>{imageLabel}</Text>
            </View>
          )}
        </View>
        <Text style={styles.title}>{title}</Text>
      </Pressable>
    );
  },
);

export default CityCta;
