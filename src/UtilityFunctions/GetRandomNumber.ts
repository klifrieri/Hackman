import GhostCharacter from "../Classes/GhostCharacter";
import Moveable from "../Types/Moveable";
import Direction from "../Types/Direction";

function getRandomNumber(min:number,max:number){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function setRandomDirectionAndCount(ghost:GhostCharacter,canMoveDirections:{direction: Direction;bewegungMoeglich: Moveable;}[])
{
  let max = 7,min =1;
  let tryBreakOutAfter:number = getRandomNumber(min,max);

  if(canMoveDirections.length === 0){
    ghost.setBewegungsRichtung = Direction.Nothing;
    ghost.setBewegungMoeglich = Moveable.No;
  }
  else if(canMoveDirections.length === 1){
    ghost.setBewegungsRichtung = canMoveDirections[0].direction;
    ghost.setBewegungMoeglich = canMoveDirections[0].bewegungMoeglich;
  }
  else{
    let index = getRandomNumber(0,canMoveDirections.length);
    ghost.setBewegungsRichtung = canMoveDirections[index].direction;
    ghost.setBewegungMoeglich = canMoveDirections[index].bewegungMoeglich;
  }
  ghost.setDeclaredCount = tryBreakOutAfter;
  return ghost;
}

export {getRandomNumber,setRandomDirectionAndCount};