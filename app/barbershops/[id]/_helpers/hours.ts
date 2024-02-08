import { addMinutes, setHours, setMinutes, format } from "date-fns";

export function generateDayTimeList(date: Date): string[] {
  const startTime =
    new Date().getHours() >= 9
      ? setMinutes(setHours(date, new Date().getHours() + 1), 0)
      : setMinutes(setHours(date, 9), 0);

  const endTime = setMinutes(setHours(date, 21), 0); // Seta a hr do fim para 21:00;
  const interval = 45;
  const timeList: string[] = [];

  let currentTime = startTime;
  while (currentTime <= endTime) {
    timeList.push(format(currentTime, "HH:mm"));
    currentTime = addMinutes(currentTime, interval);
  }

  return timeList;
}
