import { Box } from '@mui/material';
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid-pro';
import React, { FC } from 'react';

const DataGridToolbarCustom: FC = ({ children }) => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton size="medium" nonce={undefined} onResize={undefined} onResizeCapture={undefined} />
      <GridToolbarFilterButton nonce={undefined} onResize={undefined} onResizeCapture={undefined} />
      <GridToolbarDensitySelector size="medium" nonce={undefined} onResize={undefined} onResizeCapture={undefined} />
      <Box flex="1" />
      {children}
    </GridToolbarContainer>
  );
};

export default DataGridToolbarCustom;
