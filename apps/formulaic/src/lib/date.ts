import { format } from "date-fns";

export const date = {
  toLongDate: (date: Date) => format(date, "MMMM do, yyyy"),
};
