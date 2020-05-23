const _addHypthen = (name: string) => {
  const arr = name.trim().split(" ");
  if (arr.length < 2) return arr[0].trim();
  let newName = "";
  arr.forEach((e, i) => {
    if (i === arr.length - 1) {
      newName += e;
    } else {
      newName += e + "-";
    }
  });
  return newName;
};

export default _addHypthen;
