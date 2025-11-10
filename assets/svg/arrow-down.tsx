import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ArrowDownProps {
  width?: number;
  height?: number;
  color?: string;
}

const ArrowDown: React.FC<ArrowDownProps> = ({
  width = 20,
  height = 20,
  color = '#000000',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M10 5V15M15 10L10 15L5 10"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ArrowDown;