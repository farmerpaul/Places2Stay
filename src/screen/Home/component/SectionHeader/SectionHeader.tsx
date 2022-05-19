import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Text} from '/component/base';
import {spacing} from '/theme';

export type SectionHeaderProps = {
  title: string;
  paragraph?: string;
  style?: StyleProp<ViewStyle>;
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.gutter,
    marginTop: 12,
    marginBottom: 20,
  },
  paragraph: {
    marginTop: 8,
  },
});

const SectionHeader: React.FC<SectionHeaderProps> = ({
  style,
  title,
  paragraph,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text variant="title">{title}</Text>
      {!!paragraph && (
        <Text variant="body" style={styles.paragraph}>
          {paragraph}
        </Text>
      )}
    </View>
  );
};

export default SectionHeader;
