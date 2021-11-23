import { useEffect } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../State/store";
import { useState } from "react";
import { getHackmanAnimationClassName, getViewDirectionClassName } from "./determineHackmanCssClass";

const Hackman: React.FC<any> = () => {
    const hackmanDirection = useSelector((state: State) => state.gameState.hackman.direction);
    const isPaused = useSelector((state: State) => state.appState.isPaused);
    const [hackmanAnimationClassName, setHackmanAnimationClassName] = useState("hackmanFill");
    const [viewDirectionClassName, setViewDirectionClassName] = useState("");

    useEffect(() => {
        if(!isPaused){
        setHackmanAnimationClassName(getHackmanAnimationClassName(hackmanDirection));
    }
            const timeout = setTimeout(() => {
                setHackmanAnimationClassName("hackmanFill");
            }, 250);


        // return () => clearTimeout(timeout);
        //eslint-disable-next-line
    }, [isPaused]);

    useEffect(() => {
        setViewDirectionClassName(getViewDirectionClassName(hackmanDirection));
    }, [hackmanDirection]);

    return (
        <div className="field">
            <div className={"hackmanForm" + viewDirectionClassName + hackmanAnimationClassName}>
                <div className="eye"></div>
            </div>
        </div>
    );
};

export default Hackman;
