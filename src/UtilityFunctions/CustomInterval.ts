import Coordinate from "../Types/Coordinate";
import Direction from "../Types/Direction";

const CustomInterval = (funct:()=>void,mSec:number)=>{
    let isSet:boolean = false;
    let interval!:NodeJS.Timeout;
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



export default CustomInterval;