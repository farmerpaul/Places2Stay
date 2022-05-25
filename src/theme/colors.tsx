import {hexToRgba} from '/util';

export const colors = {
  yellow: '#FFF1D2',
  yellowTransparent: hexToRgba('#FFF1D2', 0),
  yellowLight: '#FFF8E8',
  deepYellow: '#FFA500',
  white: '#FFF',
  black: '#000',
  blackTransparent: hexToRgba('#000', 0),
  blue: '#4169E1',
  blueLight: '#65A0FF',
  muted: '#858585',
  greyLight: '#E3E3E3',
  grey: '#8C8C8C',
} as const;
