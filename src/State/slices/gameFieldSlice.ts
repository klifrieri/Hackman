import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { canMove, getPossibleDirections} from '../../UtilityFunctions/move/CanMove';
import SpielfeldLayout from '../../SpielfeldLayout'
import Character from '../../Classes/Character';
import Hackman from '../../Components/Hackman';
import { moveHackman } from '../../UtilityFunctions/move/MoveHackman';
import Direction from '../../Types/Direction';
import GhostCharacter from '../../Classes/GhostCharacter';
import Moveable from '../../Types/Moveable';
import { setRandomDirectionAndCount } from '../../UtilityFunctions/GetRandomNumber';
import { moveGhost } from '../../UtilityFunctions/move/MoveGhost';
import { WritableDraft } from "@reduxjs/toolkit/node_modules/immer/dist/internal";

const initialStateHackman:Character = new Character("Hackman",12,10);
const ghost1 = new GhostCharacter("Ghost1",7,9);
const ghost2 = new GhostCharacter("Ghost2",7,11);
const ghost3 = new GhostCharacter("Ghost3",9,9);
const ghost4 = new GhostCharacter("Ghost4",9,11);

const gameFieldSlice = createSlice({
    name: 'game',
    initialState:{
        gameField:SpielfeldLayout(),
        eatenCoins:0,
        hackman:initialStateHackman,
        hackmanMoved:false,
        hackComponent:Hackman,
        ghost1:ghost1,
        ghost2:ghost2,
        ghost3:ghost3,
        ghost4:ghost4,
    },
    reducers: {
      gameTick: (state) =>{
        const ghosts : WritableDraft<GhostCharacter>[]= [state.ghost1,state.ghost2,state.ghost3,state.ghost4];
        let {gameField,increaseCoins} = moveHackman(state.gameField,state.hackman,state.hackComponent);
        ghosts.forEach( ghost => {
            if(ghost.shallTick){
              if(ghost.needsNewCountDeclaration() || ghost.moveable === Moveable.No){
                const canMoveDirections:{direction: Direction;bewegungMoeglich: Moveable;}[] = getPossibleDirections(gameField,ghost.getPosition);
                ghost = setRandomDirectionAndCount(ghost,canMoveDirections);
                gameField = moveGhost(gameField,ghost);
              }
              else{
                ghost.moveable = canMove(gameField,ghost.getPosition,ghost.direction);
                gameField = moveGhost(gameField,ghost);
              }
            }
        });
        if(increaseCoins){
          state.eatenCoins++;
        }
        state.hackman.moveable = canMove(gameField,state.hackman.getPosition,state.hackman.direction);
        state.gameField = gameField;
      },
      changeIsMoveableHackman: (state,payload:PayloadAction<Direction>) => {
        state.hackman.setBewegungsRichtung = payload.payload;
        const isMoveable:Moveable = canMove(state.gameField,state.hackman.getPosition,payload.payload);
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
            state.ghost1.shallTick = true;
            break;
          case 2:
            state.ghost2.shallTick = true;
            break;
          case 3:
            state.ghost3.shallTick = true;
            break;
          case 4:
            state.ghost4.shallTick = true;
            break;
        }
      }
    },
  })

  export default gameFieldSlice;