import { debug } from 'console';
import Coin from '../../../../Components/Coin';
import Empty from '../../../../Components/Empty';
import Ghost from '../../../../Components/Ghost';
import { ghostMovesDown, ghostMovesLeft, ghostMovesRight, ghostMovesUp } from '../../../../UtilityFunctions/move/MoveGhost';
import GetGhostByPosition from '../../../Mock/GhostCharacter.Mock';
import { testGameFieldCoinGhostDown,testGameFieldCoinGhostLeft,testGameFieldCoinGhostRight,testGameFieldCoinGhostUp } from '../../../Mock/TestField.Mock';

const chai = require('chai');
const expect = require('chai').expect;

describe('ghostMovesUp',function(){
    const initialPositionY = 2;
    const initialPositionX = 1;

    const positionToTestY = 1;
    const ghost = GetGhostByPosition(initialPositionY,initialPositionX);
    let testGameField = testGameFieldCoinGhostDown.slice();
    it('should mark ghosts second Position to Coin',function(){

        console.log(testGameField)
        console.log("1 Cached" + ghost.cachedField.name + "  y" + ghost.getPosition.y + "  y" + ghost.getPosition.x);
        testGameField = ghostMovesUp(testGameField,ghost)
        console.log(testGameField)
        console.log("2 Cached" + ghost.cachedField.name + "  y" + ghost.getPosition.y + "  y" + ghost.getPosition.x);
        testGameField = ghostMovesUp(testGameField,ghost)
        console.log(testGameField)
        console.log("3 Cached" + ghost.cachedField.name + "  y" + ghost.getPosition.y + "  y" + ghost.getPosition.x);

        console.log(testGameField)
        expect(testGameField[positionToTestY][initialPositionX].name).to.deep.equal(Coin.name);
        // chai.assert.strictEqual(testGameField[initialPositionY - 1][initialPositionX],Coin);
    })
})