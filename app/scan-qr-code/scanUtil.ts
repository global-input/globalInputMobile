let lastTimeDetected = 0;

export const isWithInterval = (interval: number) => {
  var currentTime = new Date().getTime();
  if (lastTimeDetected) {
    if (currentTime - lastTimeDetected < interval) {
      return false;
    }
  }
  lastTimeDetected = currentTime;
  return true;
};
