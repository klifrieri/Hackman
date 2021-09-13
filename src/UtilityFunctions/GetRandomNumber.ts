import GhostCharacter from "../Types/Character/GhostCharacter";
import Moveable from "../Types/Moveable";
import Direction from "../Types/Direction";
import { WritableDraft } from "@reduxjs/toolkit/node_modules/immer/dist/internal";

function getRandomNumber(min:number,max:number){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function setRandomDirectionAndCount(ghost:WritableDraft<GhostCharacter>,canMoveDirections:{direction: Direction;bewegungMoeglich: Moveable;}[])
{
  let max = 7,min =1;
  let tryBreakOutAfter:number = getRandomNumber(min,max);

  if(canMoveDirections.length === 0){
    ghost.direction = Direction.Nothing;
    ghost.moveable = Moveable.No;
  }
  else if(canMoveDirections.length === 1){
    ghost.direction = canMoveDirections[0].direction;
    ghost.moveable = canMoveDirections[0].bewegungMoeglich;
  }
  else{
    let index = getRandomNumber(0,canMoveDirections.length);
    ghost.direction = canMoveDirections[index].direction;
    ghost.moveable = canMoveDirections[index].bewegungMoeglich;
  }
  ghost.declaredCount = tryBreakOutAfter;
  return ghost;
}

export {getRandomNumber,setRandomDirectionAndCount};