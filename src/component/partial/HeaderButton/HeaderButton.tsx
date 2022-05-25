import React from 'react';
import {Platform, Pressable, StyleSheet} from 'react-native';
import {Icon} from '/component/base';
import {IconProps} from '/component/base/Icon/Icon';
import {colors} from '/theme';

export type HeaderButtonProps = IconProps & {
  onPress?: () => void;
  side: 'left' | 'right';
};

const styles = StyleSheet.create({
  pressable: {
    padding: 8,
    backgroundColor: colors.yellow,
    marginTop: Platform.OS === 'android' ? -12 : 0,
  },
  left: {
    borderBottomRightRadius: 22,
  },
  right: {
    borderBottomLeftRadius: 22,
  },
});

const HeaderButton: React.FC<HeaderButtonProps> = ({onPress, svg, side}) => {
  return (
    <Pressable onPress={onPress} style={[styles.pressable, styles[side]]}>
      <Icon svg={svg} width={28} height={28} />
    </Pressable>
  );
};

export default HeaderButton;
