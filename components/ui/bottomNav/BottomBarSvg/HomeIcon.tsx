import { IIcon } from "@/src/types/components/ui/IImage";
import React from "react";
import { Path, Svg } from "react-native-svg";

const HomeIcon = ({ width, height, color }: IIcon) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9.02 2.84L3.63 7.04C2.73 7.74 2 9.23 2 10.36V17.77C2 20.09 3.89 21.99 6.21 21.99H17.79C20.11 21.99 22 20.09 22 17.77V10.36C22 9.23 21.27 7.74 20.37 7.04L14.98 2.84C13.16 1.54 10.84 1.54 9.02 2.84Z"
        fill={color}
      />
    </Svg>
  );
};

export default HomeIcon;
