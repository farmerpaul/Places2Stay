/**
 * Given a hexcode color string and a number representing the
 * desired opacity, this function returns a CSS color value string in the
 * format of: `rgba(${red}, ${green}, ${blue} ${opacity})`.
 */
const hexToRgba = (hex: string, alpha = 1): string => {
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    const hexWithoutHash = hex.replace('#', '');
    const isShorthand = hexWithoutHash.length === 3;
    const r = parseInt(
      isShorthand
        ? hexWithoutHash.slice(0, 1).repeat(2)
        : hexWithoutHash.slice(0, 2),
      16,
    );
    const g = parseInt(
      isShorthand
        ? hexWithoutHash.slice(1, 2).repeat(2)
        : hexWithoutHash.slice(2, 4),
      16,
    );
    const b = parseInt(
      isShorthand
        ? hexWithoutHash.slice(2, 3).repeat(2)
        : hexWithoutHash.slice(4, 6),
      16,
    );

    return `rgba(${r},${g},${b},${alpha})`;
  }

  return hex;
};

export default hexToRgba;
