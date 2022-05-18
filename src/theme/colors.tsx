import {hexToRgba} from '/util';

export const colors = {
  yellow: '#FFF1D2',
  yellowTransparent: hexToRgba('#FFF1D2', 0),
  yellowLight: '#FFF8E8',
  deepYellow: '#FFA500',
  white: '#FFF',
  black: '#000',
  muted: '#858585',
} as const;
