type Time = {
  [index: string]: number;
};
export function timeElapsed(date1: Date, date2: Date): string {
  let elapsedSeconds = Math.abs(date1.getTime() - date2.getTime()) / 1000;

  const metrics: Time = {
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  const data: Time = {};

  Object.keys(metrics).forEach((metric) => {
    data[metric] = Math.floor(elapsedSeconds / metrics[metric]);
    elapsedSeconds -= data[metric] * metrics[metric];
  });

  for (const metric in data) {
    if (data[metric] > 0) {
      let s = "";
      if (data[metric] > 1) {
        s += "s";
      }

      return `${data[metric]} ${metric}${s} ago`;
    }
  }

  return "now";
}
