// class CustomInterval {
//     private isSet:boolean;
//     private mSeconds:number;
//     private func:()=>void;
//     private interval!:NodeJS.Timeout;

import Koordinate from "../Types/Koordinate";
import Richtung from "../Types/Richtung";

//     constructor(func:()=>void, mSeconds:number) {
//         this.func=func;
//         this.isSet = false;
//         this.mSeconds = mSeconds;
//     }
//     start(){
//         if(!this.isSet){
//             this.interval = setInterval(this.func, this.mSeconds);
//             this.isSet = !this.isSet
//         }
//     }
//     stop(){
//         if(this.isSet){
//             clearInterval(this.interval);
//             this.isSet = !this.isSet;
//         }
//     }
// }
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