import React, {memo} from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import {spacing, colors} from '/theme';
import {Pressable, Text} from '/component/base';

export type PlaceCtaProps = {
  style?: StyleProp<ViewStyle>;
  imageSource: ImageSourcePropType;
  imageLabel?: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingHorizontal: spacing.gutter,
  },
  imageContainer: {
    marginBottom: 8,
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
    height: 150,
    width: '100%',
  },
  title: {
    marginBottom: 4,
  },
});

const PlaceCta: React.FC<PlaceCtaProps> = memo(
  ({style, imageSource, imageLabel, title, subtitle, onPress}) => {
    return (
      <Pressable style={[styles.container, style]} onPress={onPress}>
        <View style={styles.imageContainer}>
          <Image source={imageSource} style={styles.image} />
          {!!imageLabel && (
            <View style={styles.imageLabel}>
              <Text>{imageLabel}</Text>
            </View>
          )}
        </View>
        <Text variant="body" style={styles.title}>
          {title}
        </Text>
        {!!subtitle && <Text color="muted">{subtitle}</Text>}
      </Pressable>
    );
  },
);

export default PlaceCta;
