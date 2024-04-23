import { format } from 'date-fns';

export const formatDate = (date: string | Date) => format(date, 'dd/MM/yyyy');

export const formatTime = (date: string | Date) => format(date, 'HH:mm');
