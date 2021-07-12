import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import Direction from "../Types/Direction";
import {EventEmitter} from "events"

export default interface IGameFieldProps {
    fields: React.FC[][];
    onCoinEaten : any;
    spielFeldService: {
      spielFeldSubject: BehaviorSubject<React.FC<{}>[][]>;
      bewegungsRichtungSubject: BehaviorSubject<any>;
      handleKeyDown: (e: React.KeyboardEvent) => void;
      }
  }