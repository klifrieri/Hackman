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
import { WritableDraft } from "@reduxjs/toolkit/node_modules/immer/dist/internal";
import React from 'react';

const initialStateHackman:Character = new Character("Hackman",12,10);
const ghost1 = new GhostCharacter("Ghost1",7,9);
const ghost2 = new GhostCharacter("Ghost2",7,11);
const ghost3 = new GhostCharacter("Ghost3",9,9);
const ghost4 = new GhostCharacter("Ghost4",9,11);
const ghosts : GhostCharacter[]= [ghost1,ghost2,ghost3,ghost4];

const gameFieldSlice = createSlice({
    name: 'game',
    initialState:{
        gameField:SpielfeldLayout(),
        eatenCoins:0,
        hackman:initialStateHackman,
        ghosts:ghosts,
    },
    reducers: {
      gameTick: (state) =>{
        // const ghosts : WritableDraft<GhostCharacter>[]= [state.ghost1,state.ghost2,state.ghost3,state.ghost4];
        let gameFieldForAll:React.FC<any>[][] = state.gameField.slice();
        let increaseCoins = false;
          if(state.hackman.moveable === Moveable.Yes){
            let {gameField,increaseTheCoins} = moveHackman(state.gameField,state.hackman);
            gameFieldForAll = gameField;
            increaseCoins = increaseTheCoins;    
          }
          ghosts.forEach( ghost => {
              if(ghost.shallTick){
                if(ghost.needsNewCountDeclaration() || ghost.moveable === Moveable.No){
                  const canMoveDirections:{direction: Direction;bewegungMoeglich: Moveable;}[] = getPossibleDirections(gameFieldForAll,ghost.getPosition);
                  ghost = setRandomDirectionAndCount(ghost,canMoveDirections);
                }
                else{
                  ghost.moveable = canMove(gameFieldForAll,ghost.getPosition,ghost.direction);
                }
                gameFieldForAll = moveGhost(gameFieldForAll,ghost);
              }
          });
          if(increaseCoins){
            state.eatenCoins++;
          }
      },
      changeIsMoveableHackman: (state,payload:PayloadAction<Direction>) => {
        state.hackman.setBewegungsRichtung = payload.payload;
        state.hackman.moveable = canMove(state.gameField,state.hackman.getPosition,payload.payload);
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