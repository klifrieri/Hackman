import Direction from "../../../Types/Direction";

const getGhostAnimationClassName = (ghostDirection: Direction): string => {
  switch (ghostDirection) {
    case Direction.Up:
      return 'move-ghost-from-bottom-to-up ghost';
    case Direction.Left:
      return 'move-ghost-from-right-to-left ghost';
    case Direction.Down:
      return 'move-ghost-from-up-to-bottom ghost';
    case Direction.Right:
      return 'move-ghost-from-left-to-right ghost';
    default:
      return 'ghost';
  }
}


const getGhostHeadClassName = (isEdible: boolean): string => {
  if (isEdible) {
    return "ghost-head ghost-edible-head-fill "
  }
  else {
    return "ghost-head ghost-head-fill "
  }
}

const getGhostBodyClassName = (isEdible: boolean): string => {
  if (isEdible) {
    return "ghost-body ghost-edible-body-fill "
  }
  else {
    return "ghost-body ghost-body-fill "
  }
}


export { getGhostAnimationClassName,getGhostHeadClassName,getGhostBodyClassName }