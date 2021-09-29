const CustomTimerForActivatingGhost = (funct: () => void, mSec: number) => {
    let isSet: boolean = false;
    let interval!: NodeJS.Timeout;
    const start = () => {
      if (!isSet) {
        interval = setTimeout(funct, mSec);
        isSet = true;
      }
    };
    const stop = () => {
      if (isSet) {
        clearTimeout(interval);
        isSet = false;
      }
    };
    return [start, stop];
  };

  export default CustomTimerForActivatingGhost;