import React from 'react';
import {Platform, StyleSheet} from 'react-native';

import {colors} from '/theme';
import {Pressable, Icon} from '/component/base';
import {IconProps} from '/component/base/Icon/Icon';

export type HeaderButtonProps = IconProps & {
  onPress?: () => void;
  side: 'left' | 'right';
};

const styles = StyleSheet.create({
  pressable: {
    position: 'absolute',
    top: 0,
    marginTop: Platform.OS === 'android' ? -12 : 0,
    padding: 8,
    backgroundColor: colors.yellow,
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
    <Pressable
      onPress={onPress}
      scale={0.9}
      positionStyle={[styles.pressable, styles[side]]}>
      <Icon svg={svg} width={28} height={28} />
    </Pressable>
  );
};

export default HeaderButton;
