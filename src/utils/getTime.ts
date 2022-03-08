const pad = (value: number) => {
  return String(value).padStart(2, "0");
};

export const getTime = (initialTime: string | number, isCurrent?: boolean) => {
  const time = new Date(initialTime);
  const getDayTime = `${pad(time.getHours())}:${pad(time.getMinutes())}`;

  return isCurrent
    ? getDayTime
    : `${pad(time.getDate())}.${pad(
        time.getMonth() + 1
      )}.${time.getFullYear()} ${getDayTime}`;
};
