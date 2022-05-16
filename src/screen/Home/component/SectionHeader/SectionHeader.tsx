import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Text} from '/component/base';

export type Props = {
  style?: StyleProp<ViewStyle>;
  title: string;
  paragraph: string;
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 50,
  },
  title: {
    marginBottom: 7,
  },
  paragraph: {
    marginBottom: 16,
  },
});

const SectionHeader: React.FC<Props> = ({style, title, paragraph}) => {
  return (
    <View style={[style, styles.container]}>
      <Text variant="title" style={styles.title}>
        {title}
      </Text>
      <Text variant="body" style={styles.paragraph}>
        {paragraph}
      </Text>
    </View>
  );
};

export default SectionHeader;
