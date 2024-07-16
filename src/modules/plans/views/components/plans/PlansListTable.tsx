import { observer } from 'mobx-react-lite';
import { Instance } from 'mobx-state-tree';
import Link from 'next/link';
import { ChangeEvent, Fragment, MouseEvent, useState, FC } from 'react';
import { PlansRoot } from 'src/modules/plans/view-model/plans-root';
import { Scrollbar } from 'src/components/Scrollbar';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Routes } from 'src/routes';
import { Box, CardContent, Divider, Grid, IconButton, Stack, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import PlanVM from 'src/modules/plans/view-model/plans';
import { TableImage } from './TableImage';
import { usePlansModals } from 'src/modules/plans/modals';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import EditIcon from '@mui/icons-material/Edit';
export interface Product {
  id: number;
  name: string;
  description: string;
}
export const PlansListTable: FC<{
  root: Instance<typeof PlansRoot>;
  onPageChange: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  page: number;
  plans: Instance<typeof PlanVM>[];
  plansCount: number;
  rowsPerPage: number;
}> = observer(({ root, onPageChange, onRowsPerPageChange, page, plans, plansCount, rowsPerPage }) => {
  const [openProduct, setOpenProduct] = useState<number | null>(null);
  const { removedPlan } = usePlansModals().plansModals;

  const handleOpenProduct = (productId: number): void => {
    setOpenProduct((prevValue) => (prevValue === productId ? null : productId));
  };
  return (
    <div>
      <Scrollbar>
        <Table sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow>
              <TableCell width="5%" />
              <TableCell width="10%" />
              <TableCell width="30%">Name</TableCell>
              <TableCell width="45%">Description</TableCell>
              <TableCell width="10%">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plans.map((plan) => {
              const open = plan.id === openProduct;

              return (
                <Fragment key={plan.id}>
                  <TableRow hover key={plan.id}>
                    <TableCell
                      padding="checkbox"
                      sx={{
                        ...(open && {
                          position: 'relative',
                          '&:after': {
                            position: 'absolute',
                            content: '" "',
                            top: 0,
                            left: 0,
                            backgroundColor: 'primary.main',
                            width: 3,
                            height: 'calc(100% + 1px)',
                          },
                        }),
                      }}
                      width="5%"
                    >
                      <IconButton onClick={() => handleOpenProduct(plan.id)}>{open ? <ExpandMoreIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}</IconButton>
                    </TableCell>
                    <TableCell width="10%">
                      <TableImage img={plan.image} />
                    </TableCell>
                    <TableCell width="30%">
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex',
                        }}
                      >
                        <Box
                          sx={{
                            cursor: 'pointer',
                            ml: 2,
                          }}
                        >
                          <Typography variant="subtitle2">{plan.name}</Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell width="45%">{plan.description}</TableCell>
                    <TableCell width="10%" align="center">
                      <Stack color="primary" direction="row" alignItems="center">
                        <Link href={`/${Routes.dashboard.startPlan}/${plan.id}`} passHref key="View">
                          <IconButton>
                            <PlayCircleIcon fontSize="small" color="success" />
                          </IconButton>
                        </Link>
                        <Link href={`/${Routes.dashboard.plans}/${plan.id}`} passHref key="View">
                          <IconButton>
                            <EditIcon fontSize="small" color="primary" />
                          </IconButton>
                        </Link>
                        <IconButton
                          onClick={() => {
                            removedPlan.open(async (result) => {
                              root.fetchDeletePlan(plan.id);
                              return true;
                            });
                          }}
                        >
                          <DeleteIcon fontSize="small" color="error" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                  {open && (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        sx={{
                          p: 0,
                          position: 'relative',
                          '&:after': {
                            position: 'absolute',
                            content: '" "',
                            top: 0,
                            left: 0,
                            backgroundColor: 'primary.main',
                            width: 3,
                            height: 'calc(100% + 1px)',
                          },
                        }}
                      >
                        <CardContent>
                          <Grid container spacing={3}>
                            <Grid item md={12} xs={12}>
                              <Typography variant="h4">Exercise list</Typography>
                              <Divider sx={{ my: 2 }} />
                              <Grid container spacing={3}>
                                <Grid item md={12} xs={12}>
                                  <Stack fontStyle={'italic'} fontSize={'18px'} color="primary" direction="row" alignItems="center">
                                    <Stack direction="row" py={0.5} ml={5} spacing={0.5} alignItems="center" width="100%">
                                      <Stack direction="row" alignItems="center" width="40%">
                                        Name
                                      </Stack>
                                      <Stack direction="row" alignItems="center" width="15%">
                                        Series
                                      </Stack>
                                      <Stack direction="row" alignItems="center" width="15%">
                                        RPE
                                      </Stack>
                                      <Stack direction="row" alignItems="center" width="15%">
                                        Rate
                                      </Stack>
                                      <Stack direction="row" alignItems="center" width="15%">
                                        Brake seconds
                                      </Stack>
                                    </Stack>
                                  </Stack>
                                </Grid>
                                {plan.plannedExercise.map((exercise) => (
                                  <Grid item md={12} xs={12}>
                                    <Stack color="primary" direction="row" alignItems="center">
                                      <Stack direction="row" py={0.5} ml={5} spacing={0.5} alignItems="center" width="100%">
                                        <Stack direction="row" alignItems="center" width="40%">
                                          {root.getExerciseById(exercise.exerciseInfoId)?.name}
                                        </Stack>
                                        <Stack direction="row" alignItems="center" width="15%">
                                          {exercise.series}
                                        </Stack>
                                        <Stack direction="row" alignItems="center" width="15%">
                                          {exercise.rpe}
                                        </Stack>
                                        <Stack direction="row" alignItems="center" width="15%">
                                          {exercise.rate}
                                        </Stack>
                                        <Stack direction="row" alignItems="center" width="15%">
                                          {exercise.brakeSeconds}
                                        </Stack>
                                      </Stack>
                                    </Stack>
                                  </Grid>
                                ))}
                              </Grid>
                            </Grid>
                          </Grid>
                        </CardContent>
                        <Divider />
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={plansCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
});
