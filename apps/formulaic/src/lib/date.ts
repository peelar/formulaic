import { format, formatRelative } from "date-fns";

export const date = {
  toLongDate: (date: Date) => format(date, "MMMM do, yyyy"),
  toShortDateRel: (date: Date) => formatRelative(date, new Date()),
};
