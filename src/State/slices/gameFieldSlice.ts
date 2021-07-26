import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { canMove} from '../../UtilityFunctions/SpielFeldService/CanMove';
import React from 'react';
import SpielfeldLayout from '../../SpielfeldLayout'
import Character from '../../Classes/Character';
import Hackman from '../../Components/Hackman';
import { moveHackman } from '../../UtilityFunctions/SpielFeldService/MoveHackman';
import Direction from '../../Types/Direction';

const initialStateHackman:Character = new Character("Hackman",12,10);
const gameFieldSlice = createSlice({
    name: 'game',
    initialState:{
        gameField:SpielfeldLayout(),
        eatenCoins:0,
        hackman:initialStateHackman,
        hackComponent:Hackman
    },
    reducers: {
      moveHackman: (state) => {
        const {gameField,increaseCoins} = moveHackman(state.gameField,state.hackman,state.hackComponent);
        state.gameField = gameField;
        if(increaseCoins){
          state.eatenCoins++;
        }
      },
      changeIsMoveableHackman: (state,payload:PayloadAction<Direction>) => {
        state.hackman.setBewegungsRichtung = payload.payload;
        state.hackman.setBewegungMoeglich = canMove(state.gameField,state.hackman.getPosition,payload.payload);
      },
      increaseCoins: (state)=> {
        state.eatenCoins++;
      }
    },
  })

  export default gameFieldSlice;