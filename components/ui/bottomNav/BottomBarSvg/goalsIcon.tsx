import React from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';
import { IIcon } from '../../../../src/types/IImage';

const goalsIcon: React.FC<IIcon> = ({
  width = 24,
  height = 24,
  color = '#000000',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#clip0_1064_2471)">
        <Path
          d="M20.5 4H15V3.5C15 1.57 13.43 0 11.5 0H3.5C1.439 0 0 1.698 0 4.128V23.5C0 23.776 0.224 24 0.5 24C0.776 24 1 23.776 1 23.5V13H11V13.5C11 15.43 12.57 17 14.5 17H20.5C22.43 17 24 15.43 24 13.5V7.5C24 5.57 22.43 4 20.5 4ZM1 4.128C1 2.257 2.005 1 3.5 1H11.5C12.878 1 14 2.122 14 3.5V9.5C14 10.878 12.878 12 11.5 12H1V4.128ZM23 13.5C23 14.878 21.878 16 20.5 16H14.5C13.122 16 12 14.878 12 13.5V12.964C13.694 12.721 15 11.26 15 9.5V5H20.5C21.878 5 23 6.122 23 7.5V13.5Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1064_2471">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default goalsIcon;
