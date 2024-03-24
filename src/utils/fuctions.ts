export const getTimeLimitInMiliSecond = (timeLimit: string) => {
  const length = timeLimit?.length;
  const unit = timeLimit.at(length - 1);
  const value = Number.parseInt(timeLimit.slice(0, length - 1)) * 1000;
  switch (unit) {
    case 'S':
      return value;
    case 'M':
      return value * 60;
    case 'H':
      return value * 3600;
  }
};
