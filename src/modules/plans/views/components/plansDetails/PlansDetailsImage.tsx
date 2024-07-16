import React from 'react';
import { observer } from 'mobx-react-lite';
import { PlansImage } from '@trainerhelper/plans-api';
import { ImageList, ImageListItem } from '@mui/material';
import { platformPlansIcon } from '../plans/TableImage';

export const PlansDetailsImage: React.FC<{ selectedImg: PlansImage; onImgClick: (newImg: PlansImage) => void }> = observer(({ selectedImg, onImgClick }) => {
  return (
    <ImageList sx={{ width: '100%', height: 700 }} cols={3}>
      {(Object.keys(PlansImage) as Array<keyof typeof PlansImage>).map((item) => (
        <ImageListItem
          sx={{ padding: 2, backgroundColor: selectedImg === item ? 'gray' : 'white' }}
          key={item}
          onClick={() => {
            onImgClick(item);
          }}
        >
          <img src={platformPlansIcon[item]} alt={item} />
        </ImageListItem>
      ))}
    </ImageList>
  );
});
