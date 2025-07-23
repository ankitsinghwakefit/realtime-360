import { format } from 'date-fns'

export const formatDate = (dateStr) => {
  return format(new Date(dateStr), 'dd MMMM yyyy, hh:mm a')
}