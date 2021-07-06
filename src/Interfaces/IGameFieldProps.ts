import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import Richtung from "../Types/Richtung";

export default interface IGameFieldProps {
    fields: React.FC[][];
    spielFeldService: {
      spielFeldSubject: BehaviorSubject<React.FC<{}>[][]>;
      bewegungsRichtungHackmanSubject: BehaviorSubject<Richtung>;
      handleKeyDown: (e: React.KeyboardEvent) => void;
      }
  }