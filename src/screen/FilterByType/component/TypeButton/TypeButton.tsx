import React from 'react';
import {GestureResponderEvent, StyleSheet, View} from 'react-native';

import {colors} from '/theme';
import {Pressable, Text} from '/component/base';

export type TypeButtonProps = {
  title: string;
  description?: string;
  icon: React.ReactElement;
  isSelected?: boolean;
  onPress: () => void;
  onPressIn?: (event: GestureResponderEvent) => void;
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    marginVertical: 12,
    padding: 12,
    paddingRight: 20,
    shadowColor: colors.black,
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    marginTop: 8,
    marginBottom: 4,
  },
  iconContainer: {
    marginLeft: 12,
    backgroundColor: colors.blueMuted,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const TypeButton: React.FC<TypeButtonProps> = ({
  title,
  description = 'Description',
  icon,
  isSelected = false,
  onPress,
  onPressIn,
}) => {
  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      style={styles.container}
      colorAnimation={{
        property: 'backgroundColor',
        inactive: isSelected ? colors.blueLighter : colors.white,
        active: colors.blueLighter,
      }}>
      <View>
        <Text variant="title2" style={styles.title}>
          {title}
        </Text>
        <Text color="muted">{description}</Text>
      </View>
      <View style={styles.iconContainer}>{icon}</View>
    </Pressable>
  );
};

export default TypeButton;
