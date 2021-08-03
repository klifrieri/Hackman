  
const CustomInterval = (funct:()=>void,mSec:number)=>{
    let isSet:boolean = false;
    let interval!:NodeJS.Timeout;
    const start = ()=>{
        if(!isSet){
            interval = setInterval(funct, mSec);
            isSet = true;
        }
    }
    const stop = ()=>{
        if(isSet){
            clearInterval(interval);
            isSet = false;
        }
    }
    return [start,stop]
}
const CustomTimeout = (funct:()=>void,mSec:number)=>{
    let isSet:boolean = false;
    let timeout!:NodeJS.Timeout;
    const start = ()=>{
        if(!isSet){
        timeout = setTimeout(funct, mSec);
        isSet = true;
    }
    }
    const stop = ()=>{
        if(isSet){
            clearTimeout(timeout);
            isSet = false;
        }
    }
    return [start,stop]
}



export {CustomInterval,CustomTimeout};