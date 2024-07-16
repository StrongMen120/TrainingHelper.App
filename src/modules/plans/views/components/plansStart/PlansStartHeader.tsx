import { Button } from '@mui/material';
import Link from 'next/link';
import { CommonBreadcrumbs } from 'src/common/components/CommonBreadcrumbs';
import { CommonHeader } from 'src/common/components/CommonHeader';
import { Group } from 'src/common/components/Group';
import { Routes } from 'src/routes';

export const PlansStartHeader: React.FC<{ name: string; onSaveClick?: () => void }> = ({ name, onSaveClick }) => {
  return (
    <CommonHeader
      headerTitle="Plan Start"
      rightActionCorner={
        <Group>
          <Button onClick={onSaveClick} variant="contained" color="success" size="small" sx={{ marginRight: 1 }}>
            Save
          </Button>
          <Link href={Routes.dashboard.plans}>
            <Button variant="contained" size="small">
              Back to list
            </Button>
          </Link>
        </Group>
      }
      breadcrumbs={<CommonBreadcrumbs items={[{ name: 'Plans', href: Routes.dashboard.plans }, { name }]} />}
    />
  );
};
