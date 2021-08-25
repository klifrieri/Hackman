const CustomIntervalForGameTick = (funct: () => void, mSec: number) => {
    let isSet: boolean = false;
    let interval!: NodeJS.Timeout;
    const start = () => {
      if (!isSet) {
        interval = setInterval(funct, mSec);
        isSet = true;
      }
    };
    const stop = () => {
      if (isSet) {
        clearInterval(interval);
        isSet = false;
      }
    };
    return [start, stop];
  };

  export default CustomIntervalForGameTick;