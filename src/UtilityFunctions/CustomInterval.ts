import Koordinate from "../Types/Koordinate";
import Richtung from "../Types/Richtung";

const CustomIntervalF = (funct:(bewegungsRichtung:Richtung,positionOld:Koordinate)=>void,mSec:number)=>{
    let isSet:boolean = false;
    let interval!:number;
    const start = ()=>{
        if(!isSet){
            interval = setInterval(funct, mSec);
            isSet = !isSet
        }
    }
    const stop = ()=>{
        if(isSet){
            clearInterval(interval);
            isSet = !isSet;
        }
    }
    return [start,stop]
}



export default CustomIntervalF;