export const transDateTime = (workTimes: any[]) => {
  const workTime = [];
  for (let i = 0; i < workTimes.length; i++) {
    const start = workTimes[i].startWorkTime.split("T");
    const end = workTimes[i].endWorkTime.split("T");
    const date = start[0].split("-");
    if (date[1][0] === "0") date[1] = date[1].slice(1);
    if (date[2][0] === "0") date[2] = date[2].slice(1);
    workTime.push(
      `${date[1]}월 ${date[2]}일 ${start[1].slice(0, 5)}~${end[1].slice(0, 5)}`
    );
  }
  return workTime;
};
