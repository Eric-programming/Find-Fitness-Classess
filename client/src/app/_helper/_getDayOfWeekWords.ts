import { dayOfWeekOptions } from "../../options/dayOfWeekOptions";

export const getDayOfWeek = (dayOfWeek: number) => {
  return dayOfWeekOptions.filter((x) => x.value === dayOfWeek)[0].text;
};
