import { DetailedHTMLProps, ImgHTMLAttributes, useState } from 'react';

export interface ImageProps
  extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  fallbackSrc?: string;
}

export const Image = ({
  src,
  fallbackSrc = './images/cover-placeholder.png',
  ...props
}: ImageProps) => {
  const [error, setError] = useState(false);
  const [imgSrc, setImgSrc] = useState(fallbackSrc);

  const handleError = () => {
    setError(true);
  };

  const handleLoad = () => {
    !error && src && setImgSrc(src);
  };

  return (
    <img {...props} src={imgSrc} onError={handleError} onLoad={handleLoad} />
  );
};
