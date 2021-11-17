import Empty from '../../../../Components/GameFieldComponent/FieldComponents/Path/Empty';
import Hackman from '../../../../Components/GameFieldComponent/HackmanComponent/Hackman';
import { hackmanMovesDown, hackmanMovesLeft, hackmanMovesRight, hackmanMovesUp } from '../../../../UtilityFunctions/gameFieldSliceHelper/MoveHackman';
import GetHackmanByPosition from '../../../Mock/Character.Mock';
import { testGameFieldCoinHackmanMiddle } from '../../../Mock/TestField.Mock';

const chai = require('chai');

describe('hackmanMovesUp',function(){
    const initialPositionY = 1;
    const initialPositionX = 1;
    let hackman = GetHackmanByPosition(initialPositionY,initialPositionX);
    let testGameField = testGameFieldCoinHackmanMiddle.slice();
    testGameField = hackmanMovesUp(testGameField,hackman)
    it('should mark hackmans initialPosition as Empty',function(){
        chai.assert.strictEqual(testGameField[initialPositionY][initialPositionX],Empty);
    })
    it('should mark Hackmans Position Property to initialPositionY-1 and initialPositionX',function(){
        chai.assert.strictEqual(testGameField[initialPositionY - 1][initialPositionX],Hackman);
    })
    it('should change the character Position.y to initial positionY - 1 ',function(){
        chai.assert.strictEqual(hackman.position.y,initialPositionY - 1);
    })
})

describe('hackmanMovesRight',function(){
    const initialPositionY = 1;
    const initialPositionX = 1;
    let hackman = GetHackmanByPosition(initialPositionY,initialPositionX);
    let testGameField = testGameFieldCoinHackmanMiddle.slice();
    testGameField = hackmanMovesRight(testGameField,hackman)
    it('should mark hackmans initialPosition as Empty',function(){
        chai.assert.strictEqual(testGameField[initialPositionY][initialPositionX],Empty);
    })
    it('should mark Hackmans Position Property to initialPositionY and initialPositionX + 1',function(){
        chai.assert.strictEqual(testGameField[initialPositionY][initialPositionX + 1],Hackman);
    })
    it('should change the character Position.X to initial positionX + 1 ',function(){
        chai.assert.strictEqual(hackman.position.x,initialPositionX + 1);
    })
})

describe('hackmanMovesLeft',function(){
    const initialPositionY = 1;
    const initialPositionX = 1;
    let hackman = GetHackmanByPosition(initialPositionY,initialPositionX);
    let testGameField = testGameFieldCoinHackmanMiddle.slice();
    testGameField = hackmanMovesLeft(testGameField,hackman)
    it('should mark hackmans initialPosition as Empty',function(){
        chai.assert.strictEqual(testGameField[initialPositionY][initialPositionX],Empty);
    })
    it('should mark Hackmans Position Property to initialPositionY and initialPositionX - 1',function(){
        chai.assert.strictEqual(testGameField[initialPositionY][initialPositionX - 1],Hackman);
    })
    it('should change the character Position.X to initial positionX - 1 ',function(){
        chai.assert.strictEqual(hackman.position.x,initialPositionX - 1);
    })
})

describe('hackmanMovesDown',function(){
    const initialPositionY = 1;
    const initialPositionX = 1;
    let hackman = GetHackmanByPosition(initialPositionY,initialPositionX);
    let testGameField = testGameFieldCoinHackmanMiddle.slice();
    testGameField = hackmanMovesDown(testGameField,hackman)
    it('should mark hackmans initialPosition as Empty',function(){
        chai.assert.strictEqual(testGameField[initialPositionY][initialPositionX],Empty);
    })
    it('should mark Hackmans Position Property to initialPositionY + 1 and initialPositionX',function(){
        chai.assert.strictEqual(testGameField[initialPositionY + 1][initialPositionX],Hackman);
    })
    it('should change the character Position.y to initial positionY + 1 ',function(){
        chai.assert.strictEqual(hackman.position.y,initialPositionY + 1);
    })
})

