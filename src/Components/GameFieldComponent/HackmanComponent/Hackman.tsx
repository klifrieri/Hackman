import { useEffect } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../State/store";
import { useState } from "react";
import { getHackmanAnimationClassName, getViewDirectionClassName } from "./determineHackmanCssClass";

const Hackman: React.FC<any> = () => {
    const hackmanDirection = useSelector((state: State) => state.hackman.direction);
    const [hackmanAnimationClassName, setHackmanAnimationClassName] = useState("");
    const [viewDirectionClassName, setViewDirectionClassName] = useState("");

    useEffect(() => {
        setHackmanAnimationClassName(getHackmanAnimationClassName(hackmanDirection));
        const timeout = setTimeout(() => {
            setHackmanAnimationClassName("hackmanFill");
        }, 250);

        return () => clearTimeout(timeout);
        //eslint-disable-next-line
    }, []);

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
