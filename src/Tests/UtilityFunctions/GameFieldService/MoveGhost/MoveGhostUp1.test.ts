import { debug } from 'console';
import Coin from '../../../../Components/Fields/Path/Coin';
import Empty from '../../../../Components/Fields/Path/Empty';
import Ghost from '../../../../Components/Ghost/Ghost';
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
    ghostMovesUp(testGameField,ghost)
    it('should mark ghosts initialPosition as Empty',function(){
        expect(testGameField[initialPositionY][initialPositionX].name).to.deep.equal(Empty.name);
    })
    it('should mark ghosts Position Property to initialPositionY-1 and initialPositionX',function(){
        expect(testGameField[positionToTestY][initialPositionX].name).to.deep.equal(Ghost.name);
    })
    it('should change the character Position.y to initial positionY - 1 ',function(){
        expect(ghost.getPosition.y).to.deep.equal(positionToTestY);
    })
})

// describe('ghostMovesRight',function(){
//     const initialPositionY = 1;
//     const initialPositionX = 0;
//     let ghost = GetGhostByPosition(initialPositionY,initialPositionX);
//     let testGameField = testGameFieldCoinGhostLeft.slice();
//     testGameField = ghostMovesRight(testGameField,ghost)
//     it('should mark ghosts initialPosition as Empty',function(){
//         chai.assert.strictEqual(testGameField[initialPositionY][initialPositionX],Empty);
//     })
//     it('should mark ghosts Position Property to initialPositionY and initialPositionX + 1',function(){
//         chai.assert.strictEqual(testGameField[initialPositionY][initialPositionX + 1],Ghost);
//     })
//     it('should change the character Position.X to initial positionX + 1 ',function(){
//         chai.assert.strictEqual(ghost.getPosition.x,initialPositionX + 1);
//     })
//     testGameField = ghostMovesRight(testGameField,ghost);
//     it('should mark ghosts second Position to Coin',function(){
//         chai.assert.strictEqual(testGameField[initialPositionY][initialPositionX + 1],Coin);
//     })
// })

// describe('ghostMovesLeft',function(){
//     const initialPositionY = 1;
//     const initialPositionX = 2;
//     let ghost = GetGhostByPosition(initialPositionY,initialPositionX);
//     let testGameField = testGameFieldCoinGhostRight.slice();
//     testGameField = ghostMovesLeft(testGameField,ghost)
//     it('should mark ghosts initialPosition as Empty',function(){
//         chai.assert.strictEqual(testGameField[initialPositionY][initialPositionX],Empty);
//     })
//     it('should mark ghosts Position Property to initialPositionY and initialPositionX - 1',function(){
//         chai.assert.strictEqual(testGameField[initialPositionY][initialPositionX - 1],Ghost);
//     })
//     it('should change the character Position.X to initial positionX - 1 ',function(){
//         chai.assert.strictEqual(ghost.getPosition.x,initialPositionX - 1);
//     })
//     testGameField = ghostMovesLeft(testGameField,ghost);
//     it('should mark ghosts second Position to Coin',function(){
//         chai.assert.strictEqual(testGameField[initialPositionY][initialPositionX - 1],Coin);
//     })
// })

// describe('ghostMovesDown',function(){
//     const initialPositionY = 0;
//     const initialPositionX = 1;
//     let ghost = GetGhostByPosition(initialPositionY,initialPositionX);
//     let testGameField = testGameFieldCoinGhostUp.slice();
//     testGameField = ghostMovesDown(testGameField,ghost)
//     it('should mark ghosts initialPosition as Empty',function(){
//         chai.assert.strictEqual(testGameField[initialPositionY][initialPositionX],Empty);
//     })
//     it('should mark ghosts Position Property to initialPositionY + 1 and initialPositionX',function(){
//         chai.assert.strictEqual(testGameField[initialPositionY + 1][initialPositionX],Ghost);
//     })
//     it('should change the character Position.y to initial positionY + 1 ',function(){
//         chai.assert.strictEqual(ghost.getPosition.y,initialPositionY + 1);
//     })
//     testGameField = ghostMovesDown(testGameField,ghost);
//     it('should mark ghosts second Position to Coin',function(){
//         chai.assert.strictEqual(testGameField[initialPositionY + 1][initialPositionX],Coin);
//     })
// })

