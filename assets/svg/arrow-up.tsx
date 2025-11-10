import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ArrowUpProps {
  width?: number;
  height?: number;
  color?: string;
}

const ArrowUp: React.FC<ArrowUpProps> = ({
  width = 20,
  height = 20,
  color = '#000000',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M10 15V5M5 10L10 5L15 10"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ArrowUp;