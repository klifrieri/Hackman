
import Richtung from "../Types/Richtung";
import { EventEmitter } from "events";

type GhostProps = {
    richtung: Richtung;
    emitter: EventEmitter;
  };


const Ghost: React.FC<any> = (props: GhostProps) => {

    

    return (
        <div className="field">
            <div className="ghost">
                <div className="ghost-head">
                    <div className="ghost-eye"></div>
                    <div className="ghost-eye"></div>
                </div>
                <div className="ghost-body">
                    <div className="ghost-spikes"></div>
                    <div className="ghost-spikes"></div>
                    <div className="ghost-spikes"></div>
                </div>
            </div>
        </div>
    );
}

export default Ghost;