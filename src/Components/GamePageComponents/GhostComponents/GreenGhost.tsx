import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../State/store";
import GhostCharacter from "../../../Types_Classes/Character/Base/GhostCharacter";
import { getGhostAnimationClassName, getGhostBodyClassName, getGhostHeadClassName } from "./determineGhostCssClass";
import "./ghost.css";

const GreenGhost: React.FC<any> = () => {
    const ghostCharacter: GhostCharacter = useSelector((state: State) => state.gameState.ghosts[0]);
    const [ghostHeadClassName, setGhostHeadClassName] = useState("");
    const [ghostBodyClassName, setGhostBodyClassName] = useState("");
    const [ghostAnimationClassName, setGhostAnimationClassName] = useState("ghost");
    
    const isPaused = useSelector((state: State) => state.appState.isPaused);
    useEffect(() => {
        if (!isPaused) {
            setGhostAnimationClassName(getGhostAnimationClassName(ghostCharacter.direction));
        }

        const timeout = setTimeout(() => {
            setGhostAnimationClassName("ghost");
        }, 1000);

        return () => clearTimeout(timeout);
    }, [isPaused]);

    useEffect(() => {
        setGhostHeadClassName(getGhostHeadClassName(ghostCharacter.isEdible, ghostCharacter.name));
        setGhostBodyClassName(getGhostBodyClassName(ghostCharacter.isEdible, ghostCharacter.name));
    }, [ghostCharacter.isEdible]);

    return (
        <div className="field">
            <div className={ghostAnimationClassName}>
                <div className={ghostHeadClassName}>
                    <div className="ghost-eye"></div>
                    <div className="ghost-eye"></div>
                </div>
                <div className={ghostBodyClassName}>
                    <div className="ghost-spikes"></div>
                    <div className="ghost-spikes"></div>
                    <div className="ghost-spikes"></div>
                </div>
            </div>
        </div>
    );
}

export default GreenGhost;