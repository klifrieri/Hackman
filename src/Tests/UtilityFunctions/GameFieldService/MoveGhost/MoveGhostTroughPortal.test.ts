import Hackman from '../../../../Components/GameFieldComponent/HackmanComponent/Hackman';
import Empty from '../../../../Components/GameFieldComponent/FieldComponents/Path/Empty';
import { hackmanMovesDownTroughPortal, hackmanMovesLeftTroughPortal, hackmanMovesRightTroughPortal, hackmanMovesUpTroughPortal} from '../../../../UtilityFunctions/gameFieldSliceHelper/MoveHackman';
import GetHackmanByPosition from '../../../Mock/Character.Mock';
import {testGameFieldCoinPacmanDown,testGameFieldCoinPacmanLeft,testGameFieldCoinPacmanRight,testGameFieldCoinPacmanTop } from '../../../Mock/TestField.Mock';

const chai = require('chai');

describe('hackmanMovesUpThroughPortal',function(){
    const initialPositionY = 0;
    const initialPositionX = 1;
    let hackman = GetHackmanByPosition(initialPositionY,initialPositionX);
    let testGameField = testGameFieldCoinPacmanTop.slice();
    testGameField = hackmanMovesUpTroughPortal(testGameField,hackman)
    it('should mark hackmans initialPosition as Empty',function(){
        chai.assert.strictEqual(testGameField[initialPositionY][initialPositionX],Empty);
    })
    it('should mark Hackmans Position Property to testGameField.length-1 and initialPositionX',function(){
        chai.assert.strictEqual(testGameField[testGameField.length-1][initialPositionX],Hackman);
    })
    it('should change the character Position.y to testGameField.length-1 ',function(){
        chai.assert.strictEqual(hackman.position.y,testGameField.length-1);
    })
})

describe('hackmanMovesRightTroughPortal',function(){
    const initialPositionY = 1;
    const initialPositionX = 2;
    let hackman = GetHackmanByPosition(initialPositionY,initialPositionX);
    let testGameField = testGameFieldCoinPacmanRight.slice();
    testGameField = hackmanMovesRightTroughPortal(testGameField,hackman)
    it('should mark hackmans initialPosition as Empty',function(){
        chai.assert.strictEqual(testGameField[initialPositionY][initialPositionX],Empty);
    })
    it('should mark Hackmans Position Property to initialPositionY and 0',function(){
        chai.assert.strictEqual(testGameField[initialPositionY][0],Hackman);
    })
    it('should change the character Position.x to 0 ',function(){
        chai.assert.strictEqual(hackman.position.x,0);
    })
})

describe('hackmanMovesLeftTroughPortal',function(){
    const initialPositionY = 1;
    const initialPositionX = 0;
    let hackman = GetHackmanByPosition(initialPositionY,initialPositionX);
    let testGameField = testGameFieldCoinPacmanLeft.slice();
    testGameField = hackmanMovesLeftTroughPortal(testGameField,hackman)
    it('should mark hackmans initialPosition as Empty',function(){
        chai.assert.strictEqual(testGameField[initialPositionY][initialPositionX],Empty);
    })
    it('should mark Hackmans Position Property to initialPositionY and testGameField[initialPositionY].length - 1',function(){
        chai.assert.strictEqual(testGameField[initialPositionY][testGameField[initialPositionY].length - 1],Hackman);
    })
    it('should change the character Position.x to  testGameField[initialPositionY].length - 1',function(){
        chai.assert.strictEqual(hackman.position.x,testGameField[initialPositionY].length - 1);
    })
})


describe('hackmanMovesDownTroughPortal',function(){
    const initialPositionY = 2;
    const initialPositionX = 1;
    let hackman = GetHackmanByPosition(initialPositionY,initialPositionX);
    let testGameField = testGameFieldCoinPacmanDown.slice();
    testGameField = hackmanMovesDownTroughPortal(testGameField,hackman)
    it('should mark hackmans initialPosition as Empty',function(){
        chai.assert.strictEqual(testGameField[initialPositionY][initialPositionX],Empty);
    })
    it('should mark Hackmans Position Property to 0 and initialPositionX',function(){
        chai.assert.strictEqual(testGameField[0][initialPositionX],Hackman);
    })
    it('should change the character Position.y to initial 0 ',function(){
        chai.assert.strictEqual(hackman.position.y,0);
    })
})