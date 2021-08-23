const CustomInterval = (funct: () => void, mSec: number) => {
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

class Timer {
  private isSet: boolean = false;
  private timeout!: NodeJS.Timeout;
  private funct: ()=>void;
  private mSec:number;
  public start = () => {
    if (!this.isSet) {
        this.timeout = setTimeout(this.funct, this.mSec);
        this.isSet = true;
    }
  };
  public stop = () => {
    if (this.isSet) {
      clearTimeout(this.timeout);
      this.isSet = false;
    }
  };
  constructor(funct: () => void, mSec: number){
    this.funct = funct;
    this.mSec = mSec;
  }
}

export { CustomInterval, Timer };
