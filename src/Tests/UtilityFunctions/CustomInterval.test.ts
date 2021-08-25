import {CustomInterval} from "../../UtilityFunctions/Interval_And_Timer/CustomTimerForGhostEdible";

const chai = require('chai');

describe('UseInterval',function(){
    const [intervalStart,intervalStop] = CustomInterval(()=>console.log("Test!"),250);
    it('does not throw an exception if started two times',function(){   
        intervalStart();     
        chai.assert.doesNotThrow(intervalStart);
    })
    it('does not throw an exception if ended two times',function(){
        intervalStop();
        chai.assert.doesNotThrow(intervalStop)
    });
});