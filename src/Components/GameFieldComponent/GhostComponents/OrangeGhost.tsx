import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../State/store";
import GhostCharacter from "../../../Types/Character/GhostCharacter";
import {  getGhostAnimationClassName, getGhostBodyClassName, getGhostHeadClassName } from "./determineGhostCssClass";

const OrangeGhost: React.FC<any> = () => {
    const ghostCharacter: GhostCharacter = useSelector((state: State) => state.ghosts[2]);


    const [ghostHeadClassName, setGhostHeadClassName] = useState("");
    const [ghostBodyClassName, setGhostBodyClassName] = useState("");
    const [ghostAnimationClassName, setGhostAnimationClassName] = useState("ghost");


    useEffect(() => {
        setGhostHeadClassName(getGhostHeadClassName(ghostCharacter.isEdible,ghostCharacter.name));
        setGhostBodyClassName(getGhostBodyClassName(ghostCharacter.isEdible,ghostCharacter.name));
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

export default OrangeGhost;