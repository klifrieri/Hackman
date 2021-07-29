import { useEffect } from "react";
import Direction from "../../../Types/Direction";
import { useSelector } from "react-redux";
import { State } from "../../../State/store";
import { useState } from "react";

const Hackman: React.FC<any> = () => {
  const hackmanDirection = useSelector((state: State) => state.hackman.direction);
  const [hackmanAnimationClassName,setHackmanAnimationClassName] = useState("hackmanFill");
  const [viewDirectionClassName,setViewDirectionClassName] = useState("leftView");

  const getHackmanAnimationClassName = (): string => {   
    switch (hackmanDirection) {
      case Direction.Up:
        return 'move-from-bottom-to-up';
      case Direction.Left:
        return 'move-from-right-to-left';
      case Direction.Down:
        return 'move-from-up-to-bottom';
      case Direction.Right:
        return 'move-from-left-to-right';
      default:
        return '';
      }
  }
  
  const getViewDirectionClassName = (): string => {
    switch (hackmanDirection) {
      case Direction.Up:
        return ' upView ';
      case Direction.Left:
        return ' leftView ';
      case Direction.Down:
        return ' downView ';
      case Direction.Right:
        return ' rightView ';
      default:
        return ' leftView ';
      }
  };
  
  useEffect(() => {
    setHackmanAnimationClassName(getHackmanAnimationClassName())
    const timeOut = setTimeout(() => {
      setHackmanAnimationClassName("hackmanFill");
    }, 250);

    return ()=> clearTimeout(timeOut);
    //eslint-disable-next-line   
  },[]);

  useEffect(()=>{
    setViewDirectionClassName(getViewDirectionClassName());
  },[hackmanDirection])

  return (
    <div className="field">
      <div  className={"hackmanForm" + viewDirectionClassName + hackmanAnimationClassName}>
      <div className="eye"></div>
      </div>
    </div>
  );
};

export default Hackman;
