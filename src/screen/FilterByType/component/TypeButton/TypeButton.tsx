import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Text} from '/component/base';
import {colors} from '/theme';

export type TypeButtonProps = {
  title: string;
  description?: string;
  icon: React.ReactElement;
  onPress: () => void;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
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
  onPress,
}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
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
