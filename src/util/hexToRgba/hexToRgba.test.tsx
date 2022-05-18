import { hexToRgba } from '/util';

describe('hexToRgba', () => {
  afterEach(jest.clearAllMocks);

  describe('When a valid hex code is given', () => {
    describe('When an opacity value is given', () => {
      const testHexes: [string, number, string][] = [
        ['#FF0000', 0.5, 'rgba(255,0,0,0.5)'],
        ['#00FF00', 0.1, 'rgba(0,255,0,0.1)'],
        ['#0000FF', 0.75, 'rgba(0,0,255,0.75)'],
        ['#000000', 0.25, 'rgba(0,0,0,0.25)'],
        ['#FFF', 0.5, 'rgba(255,255,255,0.5)'],
        ['#7B68EE', 0.8, 'rgba(123,104,238,0.8)'],
        ['#C0C0C0', 1, 'rgba(192,192,192,1)'],
      ];

      it.each(testHexes)(
        'returns hex %s and opacity %d as an RGBA value',
        (hex, opacity, expected) => {
          expect(hexToRgba(hex, opacity)).toBe(expected);
        },
      );
    });

    describe('When an opacity value is not given', () => {
      const testHexes: [string, number, string][] = [
        ['#FF0000', 0.5, 'rgba(255,0,0,1)'],
        ['#00FF00', 0.1, 'rgba(0,255,0,1)'],
        ['#0000FF', 0.75, 'rgba(0,0,255,1)'],
        ['#000000', 0.25, 'rgba(0,0,0,1)'],
        ['#FFF', 0.5, 'rgba(255,255,255,1)'],
        ['#7B68EE', 0.8, 'rgba(123,104,238,1)'],
        ['#C0C0C0', 1, 'rgba(192,192,192,1)'],
      ];

      it.each(testHexes)(
        'returns hex %s as an RGBA value',
        (hex, opacity, expected) => {
          expect(hexToRgba(hex)).toBe(expected);
        },
      );
    });
  });

  describe('When an invalid hex code is given', () => {
    it('returns the given hex value', () => {
      const invalidHex = 'invalid hex';
      expect(hexToRgba(invalidHex)).toBe(invalidHex);
    });
  });
});
