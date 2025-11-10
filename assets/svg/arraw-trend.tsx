import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ArrawTrendProps {
  width?: number;
  height?: number;
  color?: string;
}

const ArrawTrend: React.FC<ArrawTrendProps> = ({
  width = 24,
  height = 24,
  color = '#000000',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M7 17L17 7M17 7H7M17 7V17"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ArrawTrend;