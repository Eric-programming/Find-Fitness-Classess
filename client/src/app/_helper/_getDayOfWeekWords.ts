import { dayOfWeekOptions } from "../../options/dayOfWeekOptions";

export const _getDayOfWeek = (dayOfWeek: number) => {
  return dayOfWeekOptions.filter((x) => x.value === dayOfWeek)[0].text;
};
