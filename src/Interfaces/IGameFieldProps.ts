import {BehaviorSubject, Subject} from 'rxjs';

export default interface IGameFieldProps {
    fields: React.FC[][];
    onCoinEaten : any;
    spielFeldService: {
      spielFeldSubject: BehaviorSubject<React.FC<{}>[][]>;
      bewegungsRichtungSubject: BehaviorSubject<any>;
      handleKeyDown: (e: React.KeyboardEvent) => void;
      eatenCoinsSubject:BehaviorSubject<number>;
      }
  }