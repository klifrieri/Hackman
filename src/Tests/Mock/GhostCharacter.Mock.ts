import GhostCharacter from "../../Types/Character/base/GhostCharacter";
import EasyGhostCharacter from "../../Types/Character/EasyGhostCharacter";
import CharacterIdentifier from "../../Types/CharacterIdentifier";

function GetGhostByPosition(positionY:number,positionX:number): GhostCharacter{
    return new EasyGhostCharacter(CharacterIdentifier.BlueGhost ,positionY,positionX);
}

export default GetGhostByPosition;