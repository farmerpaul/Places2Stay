import React from 'react';
import {SvgProps} from 'react-native-svg';
import {colors} from '/theme/colors';

export type Props = SvgProps & {
  /**
   * The SVG file, as a result of calling require('/path/to/file.svg').
   */
  svg: {default: React.FC<SvgProps>};
  /**
   * What color the SVG should inherit for its `currentColor`.
   *
   * @default colors.black;
   */
  color?: string;
};

/**
 * Assigns default styling to SVGs, color for now.
 */
const Icon: React.FC<Props> = ({svg, color = colors.black, ...rest}) => {
  const Svg = svg.default;
  return <Svg color={color} {...rest} />;
};

export default Icon;
