import GhostCharacter from "../../Types_Classes/Character/Base/GhostCharacter";
import EasyGhostCharacter from "../../Types_Classes/Character/EasyGhostCharacter";
import CharacterIdentifier from "../../Types_Classes/Character/Models/CharacterIdentifier";

function GetGhostByPosition(positionY:number,positionX:number): GhostCharacter{
    return new EasyGhostCharacter(CharacterIdentifier.BlueGhost ,positionY,positionX);
}

export default GetGhostByPosition;