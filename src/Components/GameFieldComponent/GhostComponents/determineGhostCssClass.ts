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


const getGhostHeadClassName = (isEdible: boolean): string => {
  if (isEdible) {
    return "ghost-head ghost-edible-fill"
  }
  else {
    return "ghost-head ghost-fill"
  }
}

const getGhostBodyClassName = (isEdible: boolean): string => {
  if (isEdible) {
    return "ghost-body ghost-edible-fill"
  }
  else {
    return "ghost-body ghost-fill"
  }
}


export { getGhostAnimationClassName,getGhostHeadClassName,getGhostBodyClassName }