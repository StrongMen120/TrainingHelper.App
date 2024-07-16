import React from 'react';
import type { FC } from 'react';

type LogoProps = Omit<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, 'alt' | 'src'>;

const LogoSmal: FC<LogoProps> = (props) => {
  return <img alt="LogoSmal" src="/static/ohth80x45.webp" {...props} />;
};

export default LogoSmal;
