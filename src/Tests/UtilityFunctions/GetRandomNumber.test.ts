import {getRandomNumber} from "./../../UtilityFunctions/GetRandomNumber";

const chai = require('chai');

const assertArrays = require('chai-arrays');
chai.use(assertArrays);

describe('GetRandomNumber',function(){
    let arr = new Array;
    const min=0,max=4;
    for(let i=0;i<10000;i++){
        let x = getRandomNumber(min,max)
        arr.push(x);
    }
    it('should get numbers between min and max',function(){
        chai.expect(arr).to.be.containingAllOf([0, 1, 2, 3]);
    });
    it('should not contain max number',function(){
        chai.expect(arr).not.to.be.containing(min-1);
    });
    it('should not contain min -1k',function(){
        chai.expect(arr).not.to.be.containing(max);
    });
})


// export {}