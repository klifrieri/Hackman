import CharacterIdentifier from "../../../Types_Classes/Character/Models/CharacterIdentifier";
import Direction from "../../../Types_Classes/Character/Models/Direction";


const getGhostAnimationClassName = (ghostDirection: Direction): string => {
  switch (ghostDirection) {
    case Direction.Up:
      return 'ghost move-ghost-from-bottom-to-up';
    case Direction.Left:
      return 'ghost move-ghost-from-right-to-left';
    case Direction.Down:
      return 'ghost move-ghost-from-up-to-bottom';
    case Direction.Right:
      return 'ghost move-ghost-from-left-to-right';
    default:
      return 'ghost';
  }
}


const getGhostHeadClassName = (isEdible: boolean, name: CharacterIdentifier): string => {
  let resultingCss: string = "ghost-head ";

  if (isEdible) {
    switch (name) {
      case CharacterIdentifier.GreenGhost:
        resultingCss += "ghost-green-edible";
        break;
      case CharacterIdentifier.RedGhost:
        resultingCss += "ghost-red-edible";
        break;
      case CharacterIdentifier.OrangeGhost:
        resultingCss += "ghost-orange-edible";
        break;
      case CharacterIdentifier.BlueGhost:
        resultingCss += "ghost-blue-edible";
        break;
    }
  }
  else {
    switch (name) {
      case CharacterIdentifier.GreenGhost:
        resultingCss += "ghost-green";
        break;
      case CharacterIdentifier.RedGhost:
        resultingCss += "ghost-red";
        break;
      case CharacterIdentifier.OrangeGhost:
        resultingCss += "ghost-orange";
        break;
      case CharacterIdentifier.BlueGhost:
        resultingCss += "ghost-blue";
        break;
    }
  }
  return resultingCss;
}

const getGhostBodyClassName = (isEdible: boolean, name: CharacterIdentifier): string => {
  let resultingCss: string = "ghost-body ";

  if (isEdible) {
    switch (name) {
      case CharacterIdentifier.GreenGhost:
        resultingCss += "ghost-green-edible";
        break;
      case CharacterIdentifier.RedGhost:
        resultingCss += "ghost-red-edible";
        break;
      case CharacterIdentifier.OrangeGhost:
        resultingCss += "ghost-orange-edible";
        break;
      case CharacterIdentifier.BlueGhost:
        resultingCss += "ghost-blue-edible";
        break;
    }
  }
  else {
    switch (name) {
      case CharacterIdentifier.GreenGhost:
        resultingCss += "ghost-green";
        break;
      case CharacterIdentifier.RedGhost:
        resultingCss += "ghost-red";
        break;
      case CharacterIdentifier.OrangeGhost:
        resultingCss += "ghost-orange";
        break;
      case CharacterIdentifier.BlueGhost:
        resultingCss += "ghost-blue";
        break;
    }
  }
  return resultingCss;
}

export { getGhostAnimationClassName, getGhostHeadClassName, getGhostBodyClassName }