import Coordinate from '../../../../Types/Coordinate';
import {getPossibleDirections} from '../../../../UtilityFunctions/move/CanMove';
import { testGameFieldEmpty, testGameFieldPortalEverywhere } from '../../../Mock/TestField.Mock';

const chai = require('chai');
const assertArrays = require('chai-arrays');
chai.use(assertArrays);

describe('GetPossibleDirections',function(){
    it('should return an array with the length of 4 because of 4 pushes with Moveable.Yes',function(){
        const middlePositionThreeTimesThree = new Coordinate(1,1);
        const arr = getPossibleDirections(testGameFieldEmpty,middlePositionThreeTimesThree);

        chai.expect(arr).to.be.ofSize(4)
    })
    it('should return an array with the length of 4 because of 4 pushes with Moveable.Portal',function(){
        const portalEverywherePosition = new Coordinate(0,0);
        const arr = getPossibleDirections(testGameFieldPortalEverywhere,portalEverywherePosition);

        chai.expect(arr).to.be.ofSize(4)
    })
})