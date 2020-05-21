const _getTime = (time: string) => {
  const timeArr = time.split(":");
  return {
    hr: +timeArr[0],
    min: +timeArr[1],
    meridiem: +timeArr[0] < 12 ? "AM" : "PM",
  };
};
export default _getTime;
