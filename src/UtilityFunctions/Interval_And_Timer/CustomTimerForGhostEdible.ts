class CustomTimerForGhostsEdible {
  private isSet: boolean = false;
  private timeout!: NodeJS.Timeout;
  private funct: () => void;
  private mSec: number;
  public start = () => {
    if (this.isSet) {
      this.stop();
    }
    else{
      this.isSet = true;
    }
    this.timeout = setTimeout(()=>{
      this.funct();
      this.isSet = false;
    }, this.mSec);
  };
  public stop = () => {
      clearTimeout(this.timeout);
  };
  constructor(funct: () => void, mSec: number) {
    this.funct = funct;
    this.mSec = mSec;
  }
}

export default CustomTimerForGhostsEdible;
