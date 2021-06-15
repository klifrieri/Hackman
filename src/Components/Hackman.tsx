import { useEffect, useState } from "react";
import Richtung from "../Types/Richtung";
import { EventEmitter } from "events";

type HackmanProps = {
  richtung: Richtung;
  emitter: EventEmitter;
};

const Hackman: React.FC<any> = (props: HackmanProps) => {
  const [classNames, setClassNames] = useState("");

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

  const moveHackman = (richtung:Richtung) => {   
    if(richtung === Richtung.Oben){
      setClassNames("hackman top move-top");
    }
    else if(richtung === Richtung.Unten){
      setClassNames("hackman bottom move-bottom");
    }
    else if(richtung === Richtung.Links){
      setClassNames("hackman left move-left");
    }
    else if(richtung === Richtung.Rechts){
      setClassNames("hackman right move-right");
    }
    else if(richtung === Richtung.Keine){
      setClassNames("hackman");
    }
    setTimeout(()=>{
      setClassNames(getClassByRichtung(props.richtung));
    }, 250)
  }
  
  
  
  const getClassByRichtung = (richtung: Richtung): string => {
    switch (richtung) {
      case Richtung.Oben:
        return `hackman top`;
      case Richtung.Links:
        return `hackman left`;
      case Richtung.Unten:
        return `hackman bottom`;
      case Richtung.Rechts:
        return `hackman right`;
      default:
        return `hackman`;
      }
  };
  props.emitter.once("startAnimation", (bewegungsRichtung) => {    
    moveHackman(bewegungsRichtung);
    console.log("Emitter started");
  })
  useEffect(() => {
    props.emitter.once("moveMouth", () => {
      //setClassNames(getClassByRichtung(props.richtung));
      moveMouth();
    })
    setClassNames(getClassByRichtung(props.richtung));   
    //eslint-disable-next-line   
  }, []);

  return (
    <div className="field">
      <div className={classNames} id="hackman">
        <div className="eye" id="eye"></div>
        <div className="mouth" id="mouth"></div>
      </div>
    </div>
  );
};

export default Hackman;
