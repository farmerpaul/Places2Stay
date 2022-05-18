import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Text} from '/component/base';

export type Props = {
  title: string;
  paragraph?: string;
  style?: StyleProp<ViewStyle>;
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 50,
    marginTop: 8,
    marginBottom: 20,
  },
  paragraph: {
    marginTop: 8,
  },
});

const SectionHeader: React.FC<Props> = ({style, title, paragraph}) => {
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
