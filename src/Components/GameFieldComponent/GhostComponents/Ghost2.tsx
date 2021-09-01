import { useSelector } from "react-redux";
import { State } from "../../../State/store";
import GhostCharacter from "../../../Types/Character/GhostCharacter";

const Ghost2: React.FC<any> = () => {
    const ghostCharacter: GhostCharacter = useSelector((state: State) => state.ghosts[1]);

    return (
        <div className="field">
            <div className="ghost">
                <div className={ghostCharacter.isEdible ? "ghost-head-edible" : "ghost-head"}>
                    <div className="ghost-eye"></div>
                    <div className="ghost-eye"></div>
                </div>
                <div className={ghostCharacter.isEdible ? "ghost-body-edible" : "ghost-body"}>
                    <div className="ghost-spikes"></div>
                    <div className="ghost-spikes"></div>
                    <div className="ghost-spikes"></div>
                </div>
            </div>
        </div>
    );
}

export default Ghost2;