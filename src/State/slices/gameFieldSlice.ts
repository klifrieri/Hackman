import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { canMove, getPossibleDirections} from '../../UtilityFunctions/move/CanMove';
import SpielfeldLayout from '../../SpielfeldLayout';
import { moveHackman } from '../../UtilityFunctions/move/MoveHackman';
import Direction from '../../Types/Direction';
import GhostCharacter from '../../Types/Character/GhostCharacter';
import Moveable from '../../Types/Moveable';
import { setRandomDirectionAndCount } from '../../UtilityFunctions/GetRandomNumber';
import { moveGhost } from '../../UtilityFunctions/move/MoveGhost';
import React from 'react';
import CoinValue from '../../Types/CoinValue';
import Empty from '../../Components/GameFieldComponent/FieldComponents/Path/Empty';
import HackmanCharacter from '../../Types/Character/HackmanCharacter';

const initialStateHackman:HackmanCharacter = new HackmanCharacter("Hackman",12,10);
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
        hackman:initialStateHackman,
        ghosts:ghosts
    },
    reducers: {
      gameTick: (state) =>{
        let gameFieldForAll:React.FC<any>[][] = state.gameField.slice();
        let increaseCoins: CoinValue = 0;
          if(state.hackman.moveable !== Moveable.No){
            let {gameField,increaseTheCoins} = moveHackman(state.gameField,state.hackman);
            gameFieldForAll = gameField;
            increaseCoins = increaseTheCoins; 
            if(increaseCoins === CoinValue.Ten){
              state.eatenCoins += 10;
              switch(state.hackman.moveable){
                case Moveable.GhostEdible1:
                  if(gameFieldForAll[7][9] === Empty){
                    state.ghosts[0].resetToStartPosition(0, 0)
                    break
                  }
                  else if(gameFieldForAll[8][9] === Empty){
                    state.ghosts[0].resetToStartPosition(1, 0)
                    break
                  }
                  else if(gameFieldForAll[7][10] === Empty){
                    state.ghosts[0].resetToStartPosition(0, 1)
                    break
                  }
                  else if(gameFieldForAll[8][10] === Empty){
                    state.ghosts[0].resetToStartPosition(1, 1)
                    break
                  }
                  else{
                    console.log("Das geht doch nicht " + state.ghosts[0].name)
                    break
                  }
                  case Moveable.GhostEdible2:
                    if(gameFieldForAll[7][11] === Empty){
                      state.ghosts[1].resetToStartPosition(0, 0)
                      break
                    }
                    else if(gameFieldForAll[7][10] === Empty){
                      state.ghosts[1].resetToStartPosition(0, -1)
                      break
                    }
                    else if(gameFieldForAll[8][11] === Empty){
                      state.ghosts[1].resetToStartPosition(1, 0)
                      break
                    }
                    else if(gameFieldForAll[8][10] === Empty){
                      state.ghosts[1].resetToStartPosition(1, -1)
                      break
                    }
                    else{
                      console.log("Das geht doch nicht " + state.ghosts[1].name)
                      break
                    }
                case Moveable.GhostEdible3:
                  if(gameFieldForAll[9][9] === Empty){
                    state.ghosts[2].resetToStartPosition(0, 0)
                    break
                  }
                  else if(gameFieldForAll[8][9] === Empty){
                    state.ghosts[2].resetToStartPosition(-1, 0)
                    break
                  }
                  else if(gameFieldForAll[9][10] === Empty){
                    state.ghosts[2].resetToStartPosition(0, 1)
                    break
                  }
                  else if(gameFieldForAll[8][10] === Empty){
                    state.ghosts[2].resetToStartPosition(-1, 1)
                    break
                  }
                  else{
                    console.log("Das geht doch nicht " + state.ghosts[2].name)
                    break
                  }
                case Moveable.GhostEdible4:
                  if(gameFieldForAll[9][11] === Empty){
                    state.ghosts[3].resetToStartPosition(0, 0)
                    break
                  }
                  else if(gameFieldForAll[8][11] === Empty){
                    state.ghosts[3].resetToStartPosition(-1, 0)
                    break
                  }
                  else if(gameFieldForAll[9][10] === Empty){
                    state.ghosts[3].resetToStartPosition(0, -1)
                    break
                  }
                  else if(gameFieldForAll[8][10] === Empty){
                    state.ghosts[3].resetToStartPosition(-1, -1)
                    break
                  }
                  else{
                    console.log("Das geht doch nicht " + state.ghosts[3].name)
                    break
                  }
              }
            }   
          }
          
          state.ghosts.forEach( ghost => {
              if(ghost.shallTick){
                if(ghost.needsNewCountDeclaration() || ghost.moveable === Moveable.No){
                  const canMoveDirections:{direction: Direction;bewegungMoeglich: Moveable;}[] = getPossibleDirections(gameFieldForAll,ghost.position);
                  ghost = setRandomDirectionAndCount(ghost,canMoveDirections);
                }
                else{
                  ghost.moveable = canMove(gameFieldForAll, ghost.position, ghost.direction);
                }
                gameFieldForAll = moveGhost(gameFieldForAll,ghost,ghosts,state.hackman);
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

          state.hackman.moveable = canMove(gameFieldForAll, state.hackman.position, state.hackman.direction,state.ghosts);
          state.gameField = gameFieldForAll;
      },
      changeIsMoveableHackman: (state,payload:PayloadAction<Direction>) => {
        state.hackman.direction = payload.payload;
        const isMoveable:Moveable = canMove(state.gameField,state.hackman.position,payload.payload, state.ghosts);
        if(isMoveable === Moveable.Yes){
          if(state.hackman.hackmanMoved === false)
          state.hackman.hackmanMoved = true;
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
