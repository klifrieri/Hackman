import HackmanCharacter from "../../Types_Classes/Character/HackmanCharacter";
import CharacterIdentifier from "../../Types_Classes/Character/Models/CharacterIdentifier";

function GetHackmanByPosition(positionY:number,positionX:number): HackmanCharacter{
    return new HackmanCharacter(CharacterIdentifier.Hackman,positionY,positionX);
}

export default GetHackmanByPosition;