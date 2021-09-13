import HackmanCharacter from "../../Types/Character/HackmanCharacter";

function GetHackmanByPosition(positionY:number,positionX:number): HackmanCharacter{
    return new HackmanCharacter("Tester",positionY,positionX);
}

export default GetHackmanByPosition;