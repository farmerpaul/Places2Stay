import React from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';

import {colors, spacing} from '/theme';
import data from '../../fixtures/stay';
import {Text} from '/component/base';

import {DataCard} from './component';
import {SafeAreaView} from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.yellow,
    flex: 1,
  },
  image: {
    width: '100%',
    height: 220,
    marginBottom: 16,
  },
  gradient: {
    position: 'absolute',
    zIndex: 1,
    top: -20,
    left: 0,
    right: 0,
    height: 72,
    opacity: 0.4,
  },
  inner: {
    marginHorizontal: spacing.gutter,
  },
  subtitle: {
    marginTop: 8,
  },
});

const Stay: React.FC = () => {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScrollView>
        <Image
          accessibilityElementsHidden
          source={data.image}
          style={styles.image}
        />
        <View style={styles.inner}>
          <View>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Stay;
