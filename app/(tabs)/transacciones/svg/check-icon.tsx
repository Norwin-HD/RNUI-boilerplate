import React from "react";
import { Path, Svg } from "react-native-svg";

const CheckIcon = ({ color = "#000", size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M10 16.4L6 12.4L7.4 11L10 13.6L16.6 7L18 8.4L10 16.4Z"
      fill={color}
    />
  </Svg>
);

export default CheckIcon;
