import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import Direction from "../Types/Direction";

export default interface IGameFieldProps {
    fields: React.FC[][];
    spielFeldService: {
      spielFeldSubject: BehaviorSubject<React.FC<{}>[][]>;
      bewegungsRichtungSubject: BehaviorSubject<any>;
      handleKeyDown: (e: React.KeyboardEvent) => void;
      }
  }