import { format, isToday, isYesterday } from "date-fns";

const formatDate = (dateParams: Date, onChat?: boolean) => {
  const date = new Date(dateParams);

  if (isToday(date)) {
    return `${format(date, "HH:mm")}`;
  } else if (isYesterday(date)) {
    return `Yesterday ${format(date, "HH:mm")}`;
  } else {
    if (onChat) {
      return format(date, "dd/MM/yy HH:mm");
    }
    if (date.getFullYear() == new Date().getFullYear()) {
      return format(date, "MMM d");
    }
    return format(date, "MMM d, yyy");
  }
}

export default formatDate;
