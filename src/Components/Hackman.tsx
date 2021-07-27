import { useEffect, useRef } from "react";
import Direction from "../Types/Direction";
import { useSelector } from "react-redux";
import { State } from "../State/store";

const Hackman: React.FC<any> = () => {
  const hackmanDirection = useSelector((state: State) => state.hackman.direction);
  const hackmanRef = useRef<HTMLDivElement>(null);

  const moveMouth = () => {
      let eye = document.getElementById("eye");
      let mouth = document.getElementById("mouth");
      if((eye?.classList.contains("eye-move"))){
        eye.classList.remove("eye-move");
      }
      else{
        eye?.classList.add("eye-move");
      }
      if(mouth?.classList.contains("mouth-open")){
        mouth.classList.remove("mouth-open");
      }
      else{
        mouth?.classList.add("mouth-open");
      }
      setTimeout(() => {
        eye?.classList.add("eye-move");
        mouth?.classList.add("mouth-open");
      }, 250)
  }

  // const moveHackman = (richtung:Direction) => {   
  //   if(richtung === Direction.Up){
  //     setClassNames("hackman top move-top");
  //   }
  //   else if(richtung === Direction.Down){
  //     setClassNames("hackman bottom move-bottom");
  //   }
  //   else if(richtung === Direction.Left){
  //     setClassNames("hackman left move-left");
  //   }
  //   else if(richtung === Direction.Right){
  //     setClassNames("hackman right move-right");
  //   }
  //   else if(richtung === Direction.Nothing){
  //     setClassNames("hackman");
  //   }
  //   // setTimeout(()=>{
  //   //   setClassNames(getClassByRichtung(props.richtung));
  //   // }, 250)
  // }
  
  
  const getClassByRichtung = (richtung: Direction): string => {
    switch (richtung) {
      case Direction.Up:
        return `hackman top`;
      case Direction.Left:
        return `hackman left`;
      case Direction.Down:
        return `hackman bottom`;
      case Direction.Right:
        return `hackman right`;
      default:
        return `hackman`;
      }
  };
  useEffect(() => {
    hackmanRef.current!.className = getClassByRichtung(hackmanDirection);
    
    //eslint-disable-next-line   
  },[]);

  return (
    <div className="field">
      <div ref={hackmanRef} id="hackman">
        <div className="eye" id="eye"></div>
        <div className="mouth" id="mouth"></div>
      </div>
    </div>
  );
};

export default Hackman;
