import {canMoveRight,canMoveLeft,canMoveDown,canMoveUp} from '../../../../UtilityFunctions/SpielFeldService/CanMove';
import Coordinate from '../../../../Types/Coordinate';
import Moveable from '../../../../Types/Moveable';
import { testGameFieldCoinHackmanMiddle, testGameFieldElse, testGameFieldEmpty, testGameFieldGhost,testGameFieldPortalLeftAndRight,testGameFieldPortalUpAndDown, testGameFieldSnack } from '../../../Mock/TestField.Mock';
const chai = require('chai');

describe('CanMoveUp',function(){
    const middlePositionThreeTimesThree = new Coordinate(1,1);
    const portalUpPosition = new Coordinate(0,0);
    it('should return Moveable.Yes when there is a coin',function(){
        const moveable = canMoveUp(testGameFieldCoinHackmanMiddle,middlePositionThreeTimesThree);

        chai.assert.strictEqual(moveable,Moveable.Yes);
    })
    it('should return Moveable.Yes when there is a snack',function(){
        const moveable = canMoveUp(testGameFieldSnack,middlePositionThreeTimesThree);

        chai.assert.strictEqual(moveable,Moveable.Yes);
    })
    it('should return Moveable.Yes when there is a empty field',function(){
        const moveable = canMoveUp(testGameFieldEmpty,middlePositionThreeTimesThree);

        chai.assert.strictEqual(moveable,Moveable.Yes);
    })
    it('should return Moveable.No when there is a Ghost',function(){
        const moveable = canMoveUp(testGameFieldGhost,middlePositionThreeTimesThree);

        chai.assert.strictEqual(moveable,Moveable.No);
    })
    it('should return Moveable.No when there is something different than the lasst cases ',function(){
        const moveable = canMoveUp(testGameFieldElse,middlePositionThreeTimesThree);

        chai.assert.strictEqual(moveable,Moveable.No);
    })
    it('should return Moveable.Portal when there is a Portal',function(){
        const moveable = canMoveUp(testGameFieldPortalUpAndDown,portalUpPosition);

        chai.assert.strictEqual(moveable,Moveable.Portal);
    })
})

describe('CanMoveDown',function(){
    const middlePositionThreeTimesThree = new Coordinate(1,1);
    const portalDownPosition = new Coordinate(1,0);
    it('should return Moveable.Yes when there is a coin',function(){
        const moveable = canMoveDown(testGameFieldCoinHackmanMiddle,middlePositionThreeTimesThree);

        chai.assert.strictEqual(moveable,Moveable.Yes);
    })
    it('should return Moveable.Yes when there is a snack',function(){
        const moveable = canMoveDown(testGameFieldSnack,middlePositionThreeTimesThree);

        chai.assert.strictEqual(moveable,Moveable.Yes);
    })
    it('should return Moveable.Yes when there is a empty field',function(){
        const moveable = canMoveDown(testGameFieldEmpty,middlePositionThreeTimesThree);

        chai.assert.strictEqual(moveable,Moveable.Yes);
    })
    it('should return Moveable.No when there is a Ghost',function(){
        const moveable = canMoveDown(testGameFieldGhost,middlePositionThreeTimesThree);

        chai.assert.strictEqual(moveable,Moveable.No);
    })
    it('should return Moveable.No when there is something different than the lasst cases ',function(){
        const moveable = canMoveDown(testGameFieldElse,middlePositionThreeTimesThree);

        chai.assert.strictEqual(moveable,Moveable.No);
    })
    it('should return Moveable.Portal when there is a Portal',function(){
        const moveable = canMoveDown(testGameFieldPortalUpAndDown,portalDownPosition);

        chai.assert.strictEqual(moveable,Moveable.Portal);
    })
})

describe('CanMoveLeft',function(){
    const middlePositionThreeTimesThree = new Coordinate(1,1);
    const portalLeftPosition = new Coordinate(0,0);
    it('should return Moveable.Yes when there is a coin',function(){
        const moveable = canMoveLeft(testGameFieldCoinHackmanMiddle,middlePositionThreeTimesThree);

        chai.assert.strictEqual(moveable,Moveable.Yes);
    })
    it('should return Moveable.Yes when there is a snack',function(){
        const moveable = canMoveLeft(testGameFieldSnack,middlePositionThreeTimesThree);

        chai.assert.strictEqual(moveable,Moveable.Yes);
    })
    it('should return Moveable.Yes when there is a empty field',function(){
        const moveable = canMoveLeft(testGameFieldEmpty,middlePositionThreeTimesThree);

        chai.assert.strictEqual(moveable,Moveable.Yes);
    })
    it('should return Moveable.No when there is a Ghost',function(){
        const moveable = canMoveLeft(testGameFieldGhost,middlePositionThreeTimesThree);

        chai.assert.strictEqual(moveable,Moveable.No);
    })
    it('should return Moveable.No when there is something different than the lasst cases ',function(){
        const moveable = canMoveLeft(testGameFieldElse,middlePositionThreeTimesThree);

        chai.assert.strictEqual(moveable,Moveable.No);
    })
    it('should return Moveable.Portal when there is a Portal',function(){
        const moveable = canMoveLeft(testGameFieldPortalLeftAndRight,portalLeftPosition);

        chai.assert.strictEqual(moveable,Moveable.Portal);
    })
})

describe('CanMoveRight',function(){
    const middlePositionThreeTimesThree = new Coordinate(1,1);
    const portalRightPosition = new Coordinate(0,1);
    it('should return Moveable.Yes when there is a coin',function(){
        const moveable = canMoveRight(testGameFieldCoinHackmanMiddle,middlePositionThreeTimesThree);

        chai.assert.strictEqual(moveable,Moveable.Yes);
    })
    it('should return Moveable.Yes when there is a snack',function(){
        const moveable = canMoveRight(testGameFieldSnack,middlePositionThreeTimesThree);
        
        chai.assert.strictEqual(moveable,Moveable.Yes);
    })
    it('should return Moveable.Yes when there is a empty field',function(){
        const moveable = canMoveRight(testGameFieldEmpty,middlePositionThreeTimesThree);

        chai.assert.strictEqual(moveable,Moveable.Yes);
    })
    it('should return Moveable.No when there is a Ghost',function(){
        const moveable = canMoveRight(testGameFieldGhost,middlePositionThreeTimesThree);

        chai.assert.strictEqual(moveable,Moveable.No);
    })
    it('should return Moveable.No when there is something different than the lasst cases ',function(){
        const moveable = canMoveRight(testGameFieldElse,middlePositionThreeTimesThree);

        chai.assert.strictEqual(moveable,Moveable.No);
    })
    it('should return Moveable.Portal when there is a Portal',function(){
        const moveable = canMoveRight(testGameFieldPortalLeftAndRight,portalRightPosition);

        chai.assert.strictEqual(moveable,Moveable.Portal);
    })
})
