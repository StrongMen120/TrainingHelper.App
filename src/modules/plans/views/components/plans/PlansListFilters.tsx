import { observer } from 'mobx-react-lite';
import { Instance } from 'mobx-state-tree';
import { ChangeEvent, FC, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import { PlansRoot } from 'src/modules/plans/view-model/plans-root';
import { Box, Button, Divider, Input } from '@mui/material';
import { useUpdateEffect } from 'src/hooks/useUpdateEffect';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Routes } from 'src/routes';

export interface Filters {
  filter?: string;
}

export const PlansListFilters: FC<{ root: Instance<typeof PlansRoot>; onChange?: (filter: Filters) => void }> = observer(({ root, onChange }) => {
  const [queryValue, setQueryValue] = useState<string>('');

  useUpdateEffect(() => {
    const filters: Filters = {
      filter: undefined,
    };
    filters.filter = queryValue;
    onChange?.(filters);
  }, [queryValue]);

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setQueryValue(event.target.value);
  };

  return (
    <div>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          p: 2,
        }}
      >
        <SearchIcon fontSize="small" />
        <Box
          sx={{
            flexGrow: 1,
            ml: 3,
          }}
        >
          <Input disableUnderline fullWidth onChange={handleQueryChange} placeholder="Search by plans name or description" value={queryValue} />
        </Box>
        <Link href={`/${Routes.dashboard.plans}/0`} passHref key="View">
          <Button startIcon={<AddCircleIcon />} variant="outlined">
            Add New Plan
          </Button>
        </Link>
      </Box>
      <Divider />
    </div>
  );
});
