const _getTime = (time: string) => {
  const timeArr = time.split(":");
  return {
    hr: +timeArr[0],
    min: +timeArr[1],
  };
};
export default _getTime;
