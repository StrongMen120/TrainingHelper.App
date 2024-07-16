import { Box, LinearProgress, Stack } from '@mui/material';
import React, { FC, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import interactionPlugin, { EventResizeDoneArg } from '@fullcalendar/interaction';
import { DateSelectArg, EventClickArg, EventDropArg } from '@fullcalendar/core';
import { format } from 'date-fns';
import { CalendarToolbar } from './CalendarToolbar';
import { CalendarView } from 'src/types/calendar';
import { FullCalendarWrapper } from './FullCalendarWrapper';
import { usePlansModals } from 'src/modules/plans/modals';
import { UsersRoot } from 'src/modules/user/view-model/user-managment-root';
import { PlansRoot } from 'src/modules/plans/view-model/plans-root';
import { Instance } from 'mobx-state-tree';
import { observer } from 'mobx-react-lite';
import { PlansType } from '@trainerhelper/plans-api';

export const ViewCalendar: FC<{ userRoot: Instance<typeof UsersRoot>; plansRoot: Instance<typeof PlansRoot> }> = observer(({ userRoot, plansRoot }) => {
  const { addPlannedTraining } = usePlansModals().planedTraining;
  const calendarRef = useRef<FullCalendar | null>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<CalendarView>('timeGridWeek');
  const handleViewChange = (newView: CalendarView): void => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.changeView(newView);
      setView(newView);
    }
  };
  const handleDatePrev = (): void => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  };
  const handleDateNext = (): void => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  };
  const handleAddClick = (): void => {
    addPlannedTraining.open(async (result) => {
      plansRoot.fetchCreatePlannedTraining({
        dateEnd: format(result.dateEnd, "yyyy-MM-dd'T'HH:mm:ss"),
        dateStart: format(result.dateStart, "yyyy-MM-dd'T'HH:mm:ss"),
        plansType: result.plansType,
        plansId: result.plansId,
        groupId: result.plansType === PlansType.Group ? result.groupId : null,
        trainerId: result.plansType === PlansType.Group || result.plansType === PlansType.Personal ? result.trainerId : null,
        userId: result.plansType === PlansType.Individual || result.plansType === PlansType.Personal ? result.userId : null,
      });
      return true;
    });
  };
  const handleEventSelect = (arg: EventClickArg): void => {
    plansRoot.setSelectedPlannedTrainings(arg.event.id);
    addPlannedTraining.open(async (result) => {
      plansRoot.fetchUpdatePlannedTraining({
        identifier: arg.event.id,
        dateEnd: format(result.dateEnd, "yyyy-MM-dd'T'HH:mm:ss"),
        dateStart: format(result.dateStart, "yyyy-MM-dd'T'HH:mm:ss"),
        plansType: result.plansType,
        plansId: result.plansId,
        groupId: result.plansType === PlansType.Group ? result.groupId : null,
        trainerId: result.plansType === PlansType.Group || result.plansType === PlansType.Personal ? result.trainerId : null,
        userId: result.plansType === PlansType.Individual || result.plansType === PlansType.Personal ? result.userId : null,
      });
      return true;
    });
  };
  const handleEventDrop = async (arg: EventDropArg): Promise<void> => {
    const { event } = arg;
    const plan = plansRoot.getPlannedTrainingById(event.id);
    if (plan) {
      plansRoot.fetchUpdatePlannedTraining({
        identifier: plan.identifier,
        dateEnd: format(event.end!, "yyyy-MM-dd'T'HH:mm:ss"),
        dateStart: format(event.start!, "yyyy-MM-dd'T'HH:mm:ss"),
        plansId: plan.plansId,
        plansType: plan.plansType,
        groupId: plan.groupId,
        trainerId: plan.trainerId,
        userId: plan.userId,
      });
    }
  };
  const handleEventResize = async (arg: EventResizeDoneArg): Promise<void> => {
    const { event } = arg;
    const plan = plansRoot.getPlannedTrainingById(event.id);
    if (plan) {
      plansRoot.fetchUpdatePlannedTraining({
        identifier: plan.identifier,
        dateEnd: format(event.end!, "yyyy-MM-dd'T'HH:mm:ss"),
        dateStart: format(event.start!, "yyyy-MM-dd'T'HH:mm:ss"),
        plansId: plan.plansId,
        plansType: plan.plansType,
        groupId: plan.groupId,
        trainerId: plan.trainerId,
        userId: plan.userId,
      });
    }
  };
  return (
    <>
      <Box
        component="main"
        sx={{
          backgroundColor: 'background.paper',
          flexGrow: 1,
        }}
      >
        <CalendarToolbar date={date} onAddClick={handleAddClick} onDateNext={handleDateNext} onDatePrev={handleDatePrev} onViewChange={handleViewChange} view={view} />
        <FullCalendarWrapper>
          {plansRoot.isLoadingPlannedTrainings ? (
            <Stack height="70%" spacing={2} alignItems="center">
              <Box sx={{ width: '80%' }}>
                <LinearProgress />
              </Box>
            </Stack>
          ) : (
            <FullCalendar
              dayMaxEventRows={3}
              droppable
              allDaySlot={false}
              editable
              eventClick={handleEventSelect}
              eventDisplay="block"
              eventDrop={handleEventDrop}
              eventResizableFromStart
              eventResize={handleEventResize}
              events={plansRoot.isLoadingPlannedTrainings ? [] : plansRoot.getEventsToCalendar(userRoot.loginUser!)}
              headerToolbar={false}
              height={'auto'}
              initialDate={date}
              initialView={view}
              plugins={[dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin, timelinePlugin]}
              ref={calendarRef}
              rerenderDelay={10}
              weekends
            />
          )}
        </FullCalendarWrapper>
      </Box>
    </>
  );
});
