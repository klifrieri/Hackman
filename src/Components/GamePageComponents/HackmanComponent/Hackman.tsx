import { useEffect } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../State/store";
import { useState } from "react";
import { getHackmanAnimationClassName, getViewDirectionClassName } from "./determineHackmanCssClass";
import "./hackman.css";

const Hackman: React.FC<any> = () => {
    const hackmanDirection = useSelector((state: State) => state.gameState.hackman.direction);
    const [viewDirectionClassName, setViewDirectionClassName] = useState("");
    
    const isPaused = useSelector((state: State) => state.appState.isPaused);
    const [hackmanAnimationClassName, setHackmanAnimationClassName] = useState("hackmanFill");
    const [animationLock, setAnimationLock] = useState(false);
        useEffect(() => {
            if (isPaused) {
                setAnimationLock(true);
            }
            else {
                if(!animationLock){
                    setHackmanAnimationClassName(getHackmanAnimationClassName(hackmanDirection));

                }
                setAnimationLock(false);
            }
            const timeout = setTimeout(() => {
                setHackmanAnimationClassName("hackmanFill");
            }, 250);

            return () => clearTimeout(timeout);
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
