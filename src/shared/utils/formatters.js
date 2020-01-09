import { format } from 'date-fns';

export const formatDate = date => format(new Date(`${date}T00:00`), 'dd/MM/yyyy');
