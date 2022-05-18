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
import {colors} from '/theme/colors';

export type Props = {
  style?: StyleProp<ViewStyle>;
  imageSource: ImageSourcePropType;
  imageLabel?: string;
  title: string;
  subtitle?: string;
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingHorizontal: 50,
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
    backgroundColor: colors.deepYellow,
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

const PlaceCta: React.FC<Props> = ({
  style,
  imageSource,
  imageLabel,
  title,
  subtitle,
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
      <Text variant="body" style={styles.title}>
        {title}
      </Text>
      {!!subtitle && <Text variant="bodyMuted">{subtitle}</Text>}
    </View>
  );
};

export default PlaceCta;
