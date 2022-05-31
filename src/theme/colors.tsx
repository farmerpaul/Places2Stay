import {hexToRgba} from '/util';

export const colors = {
  yellow: '#FFF1D2',
  yellowTransparent: hexToRgba('#FFF1D2', 0),
  yellowLight: '#FFF8E8',
  yellowDeep: '#FFA500',
  yellowDeepish: '#FDD487',
  white: '#FFF',
  black: '#000',
  blackTransparent: hexToRgba('#000', 0),
  blue: '#4169E1',
  blueLighter: '#ECF0FC',
  blueLight: '#65A0FF',
  blueMuted: 'rgba(65, 105, 225, 0.5)',
  blueGrey: '#E2DDD4',
  teal: '#A0C8D5',
  muted: '#858585',
  greyLight: '#E3E3E3',
  grey: '#8C8C8C',
  silver: '#C1BBBB',
} as const;
