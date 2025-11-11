import { Image } from 'expo-image';

const baseUrl = 'https://ik.imagekit.io/ffbwrejsa/Kovara/';

type DynamicImageProps = {
  path: string;
  width: number;
  height: number;
  borderRadius?: number;
};

const DynamicImage: React.FC<DynamicImageProps> = ({ path, width, height, borderRadius = 10 }) => {
  const imageUrl = `${baseUrl}${path}?tr=w-${width * 2},h-${height * 2},q-100,f-auto,dpr-auto,bl-0,usm=50-1-1`;


  return (
    <Image
      style={{ width, height, borderRadius }}
      source={{ uri: imageUrl }}
      contentFit="contain"
    />
  );
};

export default DynamicImage;
