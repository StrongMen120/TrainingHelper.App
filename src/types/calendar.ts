export interface CalendarEvent {
  id?: string;
  color?: string;
  planId?: number;
  end: number;
  start: number;
  title: string;
}

export type CalendarView = 'dayGridMonth' | 'timeGridWeek';
