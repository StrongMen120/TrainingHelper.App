import { Box } from '@mui/material';
import router from 'next/router';
import { Scrollbar } from 'src/components/Scrollbar';
import { useRuntimeConfig } from 'src/hooks/useRuntimeConfig';
import { sections } from 'src/layouts/Sidebar/sections';
import { DashboardSidebarSection } from './items/DashboardSidebarSection';
import { useUsersManagementsRoot } from 'src/modules/user/context/UsersManagementsContext';

export const SidebarContent: React.FC<{ isCollapsed: boolean }> = ({ isCollapsed }) => {
  const config = useRuntimeConfig();
  const userRoot = useUsersManagementsRoot();
  return (
    <Box sx={{ flex: 1, overflow: 'hidden' }}>
      <Scrollbar
        sx={{
          height: '100%',
          '& .simplebar-content': {
            height: '100%',
          },
          overflowX: 'hidden',
        }}
      >
        <Box flexGrow={1}>
          {sections.map((section) => {
            if (section.getVisibility && !section.getVisibility(config, userRoot.checkIsAdmin(), userRoot.checkIsTrainer())) {
              return null;
            }
            return (
              <DashboardSidebarSection
                key={section.title}
                path={router.asPath}
                collapsed={!isCollapsed}
                sx={{
                  mt: 2,
                  '& + &': {
                    mt: 2,
                  },
                }}
                {...section}
              />
            );
          })}
        </Box>
      </Scrollbar>
    </Box>
  );
};
