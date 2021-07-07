import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import Richtung from "../Types/Richtung";

export default interface IGameFieldProps {
    fields: React.FC[][];
    spielFeldService: {
      spielFeldSubject: BehaviorSubject<React.FC<{}>[][]>;
      bewegungsRichtungSubject: BehaviorSubject<any>;
      handleKeyDown: (e: React.KeyboardEvent) => void;
      }
  }