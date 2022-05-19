import React from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';

import data from '../../fixtures/stay';
import {Text} from '/component/base';

import {DataCard} from './component';
import {spacing} from '/theme';

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 220,
    marginBottom: 16,
  },
  container: {
    marginHorizontal: spacing.gutter,
  },
  subtitle: {
    marginTop: 8,
  },
});

const Stay: React.FC = () => {
  return (
    <ScrollView>
      <Image source={data.image} style={styles.image} />
      <View style={styles.container}>
        <Text variant="title">{data.title}</Text>
        <Text color="muted" style={styles.subtitle}>
          {data.location}
        </Text>
        <Text color="muted" style={styles.subtitle}>
          {data.dates}
        </Text>
        <DataCard
          title={data.details[0].title}
          data={data.details[0].items}
          onPressEllipsis={() => null}
        />
        <DataCard
          title={data.details[1].title}
          data={data.details[1].items}
          onPressEllipsis={() => null}
        />
      </View>
    </ScrollView>
  );
};

export default Stay;
