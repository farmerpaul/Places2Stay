import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Icon, Text} from '/component/base';
import {colors} from '/theme';

export type DataCardProps = {
  title: string;
  data: Array<{itemLabel: string; itemDetail: string}>;
  onPressEllipsis?: () => void;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderColor: '#E1DFD8',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    paddingBottom: 24,
    marginTop: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    backgroundColor: colors.blue,
    padding: 8,
    borderBottomRightRadius: 8,
  },
  ellipsis: {
    marginRight: 16,
    marginTop: 16,
  },
  dataRow: {
    flexDirection: 'row',
    marginTop: 12,
    marginHorizontal: 32,
    justifyContent: 'space-between',
  },
});

const DataCard: React.FC<DataCardProps> = ({title, data, onPressEllipsis}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.title}>
          <Text color="white">{title}</Text>
        </View>
        {onPressEllipsis && (
          <Pressable onPress={onPressEllipsis} style={styles.ellipsis}>
            <Icon
              svg={require('/asset/svg/ellipsis.svg')}
              color={colors.blue}
            />
          </Pressable>
        )}
      </View>
      {data.map(({itemLabel, itemDetail}) => (
        <View key={itemLabel} style={styles.dataRow}>
          <Text>{itemLabel}</Text>
          <Text>{itemDetail}</Text>
        </View>
      ))}
    </View>
  );
};

export default DataCard;
