import GhostCharacter from "../../Types/Character/GhostCharacter";
import CharacterIdentifier from "../../Types/CharacterIdentifier";

function GetGhostByPosition(positionY:number,positionX:number): GhostCharacter{
    return new GhostCharacter(CharacterIdentifier.BlueGhost ,positionY,positionX);
}

export default GetGhostByPosition;