import React from 'react';
import type { FC } from 'react';

type LogoProps = Omit<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, 'alt' | 'src'>;

const Logo: FC<LogoProps> = (props) => {
  return <img alt="Logo" src="/static/th135x90.webp" {...props} />;
};

export default Logo;
