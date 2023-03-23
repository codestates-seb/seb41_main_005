export const transDateTime = (workTimes: any[]) => {
  const workTime = [];
  for (let i = 0; i < workTimes.length; i++) {
    const start = workTimes[i].startWorkTime.split("T");
    const end = workTimes[i].endWorkTime.split("T");
    const startDate = start[0].split("-");
    if (startDate[1][0] === "0") startDate[1] = startDate[1].slice(1);
    if (startDate[2][0] === "0") startDate[2] = startDate[2].slice(1);
    const endDate = end[0].split("-");
    if (endDate[1][0] === "0") endDate[1] = endDate[1].slice(1);
    if (endDate[2][0] === "0") endDate[2] = endDate[2].slice(1);
    workTime.push(
      `${startDate[1]}월 ${startDate[2]}일 ${start[1].slice(0, 5)} ~ ${
        endDate[1]
      }월 ${endDate[2]}일 ${end[1].slice(0, 5)}`
    );
  }
  return workTime;
};
