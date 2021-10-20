import HackmanCharacter from "../../Types/Character/HackmanCharacter";
import CharacterIdentifier from "../../Types/CharacterIdentifier";

function GetHackmanByPosition(positionY:number,positionX:number): HackmanCharacter{
    return new HackmanCharacter(CharacterIdentifier.Hackman,positionY,positionX);
}

export default GetHackmanByPosition;