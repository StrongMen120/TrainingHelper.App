import type { ChangeEvent, ElementType, FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Box, Button, IconButton, MenuItem, TextField, Typography } from '@mui/material';
import ViewConfigIcon from '@mui/icons-material/ViewComfy';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import ViewDayIcon from '@mui/icons-material/ViewDay';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import { Add as AddIcon, ArrowBack as ArrowBackIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { CalendarView } from 'src/types/calendar';

interface CalendarToolbarProps {
  children?: ReactNode;
  date: Date;
  onAddClick?: () => void;
  onDateNext?: () => void;
  onDatePrev?: () => void;
  onViewChange?: (view: CalendarView) => void;
  view: CalendarView;
}

interface ViewOption {
  label: string;
  value: CalendarView;
}

const viewOptions: ViewOption[] = [
  {
    label: 'Month',
    value: 'dayGridMonth',
  },
  {
    label: 'Week',
    value: 'timeGridWeek',
  },
];

export const CalendarToolbar: FC<CalendarToolbarProps> = (props) => {
  const { date, onAddClick, onDateNext, onDatePrev, onViewChange, view, ...other } = props;
  const handleViewChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onViewChange?.(event.target.value as CalendarView);
  };

  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        px: 10,
        flexDirection: {
          xs: 'column',
          md: 'row',
        },
      }}
      {...other}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          mb: {
            xs: 2,
            md: 0,
          },
          mr: 2,
        }}
      >
        <Typography variant="h4">{format(date, 'MMMM')}</Typography>
        <Typography
          sx={{
            fontWeight: 400,
            ml: 1,
          }}
          variant="h4"
        >
          {format(date, 'y')}
        </Typography>
      </Box>
      <Box
        sx={{
          alignItems: 'center',
          flexWrap: 'wrap',
          display: 'flex',
          m: -1,
        }}
      >
        <Box sx={{ m: 1 }}>
          <IconButton onClick={onDatePrev}>
            <ArrowBackIcon fontSize="medium" color="primary" />
          </IconButton>
          <IconButton onClick={onDateNext}>
            <ArrowForwardIcon fontSize="medium" color="primary" />
          </IconButton>
        </Box>
        <TextField
          select
          label="View"
          onChange={handleViewChange}
          size="small"
          value={view}
          sx={{
            ml: {
              xs: 'auto',
              md: 1,
            },
            m: 1,
            minWidth: 120,
          }}
        >
          {viewOptions.map((viewOption) => {
            return <MenuItem value={viewOption.value}>{viewOption.label}</MenuItem>;
          })}
        </TextField>
        <Button onClick={onAddClick} startIcon={<AddIcon fontSize="small" />} variant="contained">
          New Plan
        </Button>
      </Box>
    </Box>
  );
};

CalendarToolbar.propTypes = {
  children: PropTypes.node,
  date: PropTypes.instanceOf(Date).isRequired,
  onAddClick: PropTypes.func,
  onDateNext: PropTypes.func,
  onDatePrev: PropTypes.func,
  onViewChange: PropTypes.func,
  view: PropTypes.oneOf<CalendarView>(['dayGridMonth', 'timeGridWeek']).isRequired,
};
