export default function transformDuration(durationInMs: number) {
  const durationInSeconds = Math.round(durationInMs / 1000);
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds - hours * 3600) / 60);

  if (hours > 0 && minutes > 0) {
    return `${hours} 時 ${minutes} 分`;
  } else if (hours > 0) {
    return `${hours} 時`;
  } else {
    return `${minutes} 分`;
  }
}
