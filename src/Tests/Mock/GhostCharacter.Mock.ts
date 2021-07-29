import GhostCharacter from "../../Types/Character/GhostCharacter";

function GetGhostByPosition(positionY:number,positionX:number): GhostCharacter{
    return new GhostCharacter("Tester",positionY,positionX);
}

export default GetGhostByPosition;