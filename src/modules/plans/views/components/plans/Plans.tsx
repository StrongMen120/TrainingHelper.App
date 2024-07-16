import { observer } from 'mobx-react-lite';
import { Instance } from 'mobx-state-tree';
import { FC, useState, MouseEvent, ChangeEvent } from 'react';
import { PlansRoot } from 'src/modules/plans/view-model/plans-root';
import { Filters, PlansListFilters } from './PlansListFilters';
import { PlansListTable, Product } from './PlansListTable';
import { Card, Divider, Stack } from '@mui/material';
import PlanVM from 'src/modules/plans/view-model/plans';
import { CommonHeader } from 'src/common/components/CommonHeader';
import { CommonBreadcrumbs } from 'src/common/components/CommonBreadcrumbs';
import { Routes } from 'src/routes';

const applyFilters = (products: Instance<typeof PlanVM>[], filters: Filters): Instance<typeof PlanVM>[] =>
  products.filter((product) => {
    if (filters.filter) {
      const nameMatched = product.name.toLowerCase().includes(filters.filter.toLowerCase()) || product.description.toLowerCase().includes(filters.filter.toLowerCase());
      if (!nameMatched) return false;
    }
    return true;
  });
const applyPagination = (products: Instance<typeof PlanVM>[], page: number, rowsPerPage: number): Instance<typeof PlanVM>[] =>
  products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

export const Plans: FC<{ root: Instance<typeof PlansRoot> }> = observer(({ root }) => {
  const [filters, setFilters] = useState<Filters>({
    filter: undefined,
  });
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const handleFiltersChange = (filters: Filters): void => {
    setFilters(filters);
  };

  const filteredProducts = applyFilters(root.plans, filters);
  const paginatedProducts = applyPagination(filteredProducts, page, rowsPerPage);
  return (
    <Stack height="100%">
      <CommonHeader headerTitle="Plans" breadcrumbs={<CommonBreadcrumbs items={[{ name: 'Plans' }, { name: 'Plans', href: Routes.dashboard.plans }]} />} />
      <Divider />
      <PlansListFilters onChange={handleFiltersChange} root={root} />
      <PlansListTable
        onPageChange={(event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
          setPage(newPage);
        }}
        onRowsPerPageChange={(event: ChangeEvent<HTMLInputElement>): void => {
          setRowsPerPage(parseInt(event.target.value, 10));
        }}
        page={page}
        plans={paginatedProducts}
        plansCount={filteredProducts.length}
        rowsPerPage={rowsPerPage}
        root={root}
      />
    </Stack>
  );
});
