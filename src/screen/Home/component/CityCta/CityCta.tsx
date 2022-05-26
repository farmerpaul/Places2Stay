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
import {colors} from '/theme';

export type CityCtaProps = {
  style?: StyleProp<ViewStyle>;
  imageSource: ImageSourcePropType;
  title: string;
  imageLabel?: string;
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
    backgroundColor: colors.deepYellow,
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

const CityCta: React.FC<CityCtaProps> = ({
  style,
  imageSource,
  title,
  imageLabel,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
        {!!imageLabel && (
          <View style={styles.imageLabel}>
            <Text>{imageLabel}</Text>
          </View>
        )}
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default CityCta;
