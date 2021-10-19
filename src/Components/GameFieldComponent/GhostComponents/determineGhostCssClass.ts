import Direction from "../../../Types/Direction";

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


const getGhostHeadClassName = (isEdible: boolean, name: string): string => {
  let resultingCss: string = "ghost-head ";

  if (isEdible) {
    switch (name) {
      case "GreenGhost":
        resultingCss += "ghost-green-edible";
        break;
      case "BlueGhost":
        resultingCss += "ghost-blue-edible";
        break;
      case "OrangeGhost":
        resultingCss += "ghost-orange-edible";
        break;
      case "RedGhost":
        resultingCss += "ghost-red-edible";
        break;
    }
  }
  else {
    switch (name) {
      case "GreenGhost":
        resultingCss += "ghost-green";
        break;
      case "BlueGhost":
        resultingCss += "ghost-blue";
        break;
      case "OrangeGhost":
        resultingCss += "ghost-orange";
        break;
      case "RedGhost":
        resultingCss += "ghost-red";
        break;
    }
  }
  return resultingCss;
}

const getGhostBodyClassName = (isEdible: boolean, name: string): string => {
  let resultingCss: string = "ghost-body ";

  if (isEdible) {
    switch (name) {
      case "GreenGhost":
        resultingCss += "ghost-green-edible";
        break;
      case "BlueGhost":
        resultingCss += "ghost-blue-edible";
        break;
      case "OrangeGhost":
        resultingCss += "ghost-orange-edible";
        break;
      case "RedGhost":
        resultingCss += "ghost-red-edible";
        break;
    }
  }
  else {
    switch (name) {
      case "GreenGhost":
        resultingCss += "ghost-green";
        break;
      case "BlueGhost":
        resultingCss += "ghost-blue";
        break;
      case "OrangeGhost":
        resultingCss += "ghost-orange";
        break;
      case "RedGhost":
        resultingCss += "ghost-red";
        break;
    }
  }
  return resultingCss;
}

export { getGhostAnimationClassName, getGhostHeadClassName, getGhostBodyClassName }