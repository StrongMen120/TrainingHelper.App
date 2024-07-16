import { Box, IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { isNil } from 'lodash';
import { DeleteOutline as DeleteOutlineIcon } from '@mui/icons-material';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { ViewWrapper } from 'src/common/components/ViewWrapper';
import { FileDetailsDto } from '@trainerhelper/plans-api';
import { usePlansRoot } from 'src/modules/plans/context/PlansContext';

export const ExerciseImage: FC<{ files: FileDetailsDto[] | null | undefined; hasPermission: boolean }> = observer(({ files, hasPermission }) => {
  const plansRoot = usePlansRoot();
  if (isNil(files)) return null;
  return (
    <Box sx={{ height: '100%', width: '80%', margin: '2px 10% 2px 10%' }}>
      <ViewWrapper>
        <ImageList sx={{ width: '100%', height: 350 }} cols={1} rowHeight={'auto'}>
          {files.map((item) => (
            <ImageListItem sx={{ marginBottom: 1, border: 6, borderColor: 'primary.main' }} key={item.identifier}>
              <img src={`data:image/png;base64,${item.bytes}`} alt={item.name} loading="lazy" />
              <ImageListItemBar
                sx={{
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' + 'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                }}
                title={item.name}
                position="top"
                actionIcon={
                  hasPermission && (
                    <IconButton
                      sx={{ color: 'red' }}
                      aria-label={`star ${item.name}`}
                      onClick={() => {
                        plansRoot.fetchDeleteFiles(plansRoot.exerciseDetailsId, item.name);
                      }}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  )
                }
                actionPosition="left"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </ViewWrapper>
    </Box>
  );
});
