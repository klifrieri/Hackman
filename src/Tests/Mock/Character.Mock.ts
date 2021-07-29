import Character from "../../Types/Character/Character";

function GetHackmanByPosition(positionY:number,positionX:number): Character{
    return new Character("Tester",positionY,positionX);
}

export default GetHackmanByPosition;