import {hexToRgba} from '/util';

export const colors = {
  yellow: '#FFF1D2',
  yellowTransparent: hexToRgba('#FFF1D2', 0),
  yellowLight: '#FFF8E8',
  deepYellow: '#FFA500',
  white: '#FFF',
  black: '#000',
  blue: '#4169E1',
  blueTransparent: hexToRgba('#4169E1', 0),
  muted: '#858585',
  grey: '#E3E3E3',
} as const;
