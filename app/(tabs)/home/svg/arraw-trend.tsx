import { IIcon } from '@/types/components/ui/IImage';
import React from 'react';
import { ClipPath, Defs, G, Path, Rect, Svg } from 'react-native-svg';

const ArrawTrend = ({ width, height, color }: IIcon) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
  >
    <G clipPath="url(#clip0_17_17441)">
      <Path
        d="M17.5002 5H12.5002C12.0394 5 11.6669 5.3725 11.6669 5.83333C11.6669 6.29417 12.0394 6.66667 12.5002 6.66667H17.1552L11.6869 12.135C11.2169 12.605 10.4519 12.605 9.98104 12.135L7.86521 10.0192C6.74521 8.89917 4.92271 8.89917 3.80271 10.0192L0.244375 13.5775C-0.0814583 13.9033 -0.0814583 14.43 0.244375 14.7558C0.406875 14.9183 0.620208 15 0.833542 15C1.04688 15 1.26021 14.9183 1.42271 14.7558L4.98104 11.1975C5.43688 10.7417 6.23104 10.7417 6.68688 11.1975L8.80271 13.3133C9.92271 14.4333 11.7452 14.4333 12.8652 13.3133L18.3344 7.845V12.5C18.3344 12.9608 18.7069 13.3333 19.1677 13.3333C19.6285 13.3333 20.001 12.9608 20.001 12.5V7.5C20.001 6.12167 18.8785 5 17.5002 5Z"
        fill={color}
      />
    </G>
    <Defs>
      <ClipPath id="clip0_17_17441">
        <Rect width="20" height="20" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default ArrawTrend;