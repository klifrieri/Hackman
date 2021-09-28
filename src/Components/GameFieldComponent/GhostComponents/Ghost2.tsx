import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../State/store";
import GhostCharacter from "../../../Types/Character/GhostCharacter";
import {  getGhostAnimationClassName, getGhostBodyClassName, getGhostHeadClassName } from "./determineGhostCssClass";

const Ghost2: React.FC<any> = () => {
    const ghostCharacter: GhostCharacter = useSelector((state: State) => state.ghosts[1]);

    const [ghostHeadClassName, setGhostHeadClassName] = useState("ghost-head ghost-head-fill");
    const [ghostBodyClassName, setGhostBodyClassName] = useState("ghost-body ghost-body-fill ghost-body-position");
    const [ghostAnimationClassName, setGhostAnimationClassName] = useState("ghost");


    useEffect(() => {
        setGhostHeadClassName(getGhostHeadClassName(ghostCharacter.isEdible));
        setGhostBodyClassName(getGhostBodyClassName(ghostCharacter.isEdible));
    }, [ghostCharacter.isEdible]);

    useEffect(() => {
        setGhostAnimationClassName(getGhostAnimationClassName(ghostCharacter.direction))
        const timeout = setTimeout(() => {
            setGhostAnimationClassName("ghost");
        }, 1000);

        return () => clearTimeout(timeout);
        //eslint-disable-next-line   
    }, []);

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

export default Ghost2;