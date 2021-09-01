import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { canMove, getPossibleDirections} from '../../UtilityFunctions/move/CanMove';
import SpielfeldLayout from '../../SpielfeldLayout'
import Character from '../../Types/Character/Character';
import { moveHackman } from '../../UtilityFunctions/move/MoveHackman';
import Direction from '../../Types/Direction';
import GhostCharacter from '../../Types/Character/GhostCharacter';
import Moveable from '../../Types/Moveable';
import { setRandomDirectionAndCount } from '../../UtilityFunctions/GetRandomNumber';
import { moveGhost } from '../../UtilityFunctions/move/MoveGhost';
import React from 'react';
import CoinValue from '../../Types/CoinValue';
//import Coordinate from '../../Types/Coordinate';

const initialStateHackman:Character = new Character("Hackman",12,10);
// const ghost1InitialCoordinate : Coordinate = new Coordinate(7,9);
// const ghost2InitialCoordinate : Coordinate = new Coordinate(7,11);
// const ghost3InitialCoordinate : Coordinate = new Coordinate(9,9);
// const ghost4InitialCoordinate : Coordinate = new Coordinate(9,11);
const ghost1 = new GhostCharacter("Ghost1",7,9);
const ghost2 = new GhostCharacter("Ghost2",7,11);
const ghost3 = new GhostCharacter("Ghost3",9,9);
const ghost4 = new GhostCharacter("Ghost4",9,11);
const ghosts : GhostCharacter[]= [ghost1, ghost2, ghost3, ghost4];

const gameFieldSlice = createSlice({
    name: 'game',
    initialState:{
        gameField:SpielfeldLayout(),
        eatenCoins:0,
        hackmanMoved:false,
        hackman:initialStateHackman,
        ghosts:ghosts
    },
    reducers: {
      gameTick: (state) =>{
        let gameFieldForAll:React.FC<any>[][] = state.gameField.slice();
        let increaseCoins: CoinValue = 0;
          if(state.hackman.moveable === Moveable.Yes || state.hackman.moveable === Moveable.Portal){
            let {gameField,increaseTheCoins} = moveHackman(state.gameField,state.hackman);
            gameFieldForAll = gameField;
            increaseCoins = increaseTheCoins; 
            // if(increaseCoins === CoinValue.Ten){
            //   state.eatenCoins += 10;
            //   switch(state.hackman.moveable){
            //     case Moveable.GhostEdible1:
            //       state.ghosts[0].resetToStartPosition()
            //       // setGhostToInitialPosition()
            //       break;
            //     case Moveable.GhostEdible2:
            //       state.ghosts[1].resetToStartPosition();
            //       break;
            //     case Moveable.GhostEdible3:
            //       state.ghosts[2].resetToStartPosition();
            //       break;
            //     case Moveable.GhostEdible4:
            //       state.ghosts[3].resetToStartPosition();
            //       break;
            //   }
            // }   
          }
          
          state.ghosts.forEach( ghost => {
              if(ghost.shallTick){
                if(ghost.needsNewCountDeclaration() || ghost.moveable === Moveable.No){
                  const canMoveDirections:{direction: Direction;bewegungMoeglich: Moveable;}[] = getPossibleDirections(gameFieldForAll,ghost.getPosition,state.ghosts);
                  ghost = setRandomDirectionAndCount(ghost,canMoveDirections);
                }
                else{
                  ghost.moveable = canMove(gameFieldForAll, ghost.getPosition, ghost.direction,state.ghosts);
                }
                gameFieldForAll = moveGhost(gameFieldForAll,ghost);
              }
          });
          if(increaseCoins === CoinValue.One) {
            state.eatenCoins++;
          }
          else if (increaseCoins === CoinValue.Five)
          {
            state.eatenCoins += 5;
            state.ghosts.forEach( ghost => {
              ghost.isEdible = true;              
            });
          }

          state.hackman.moveable = canMove(gameFieldForAll, state.hackman.getPosition, state.hackman.direction, null);
          state.gameField = gameFieldForAll;
      },
      changeIsMoveableHackman: (state,payload:PayloadAction<Direction>) => {
        state.hackman.setBewegungsRichtung = payload.payload;
        const isMoveable:Moveable = canMove(state.gameField,state.hackman.getPosition,payload.payload, state.ghosts);
        if(isMoveable === Moveable.Yes){
          if(state.hackmanMoved === false)
          state.hackmanMoved = true;
        }
        state.hackman.moveable = isMoveable;
      },
      increaseCoins: (state)=> {
        state.eatenCoins++;
      },
      activateGhost:(state,payload:PayloadAction<number>)=>{
        switch(payload.payload){
          case 1:
            state.ghosts[0].shallTick = true;
            break;
          case 2:
            state.ghosts[1].shallTick = true;
            break;
          case 3:
            state.ghosts[2].shallTick = true;
            break;
          case 4:
            state.ghosts[3].shallTick = true;
            break;
        }
      }
    },
  })

  export default gameFieldSlice;
