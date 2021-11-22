import Direction from "../../../Types_Classes/Character/Models/Direction";


const getHackmanAnimationClassName = (hackmanDirection:Direction): string => {   
    switch (hackmanDirection) {
      case Direction.Up:
        return 'move-hackman-from-bottom-to-up';
      case Direction.Left:
        return 'move-hackman-from-right-to-left';
      case Direction.Down:
        return 'move-hackman-from-up-to-bottom';
      case Direction.Right:
        return 'move-hackman-from-left-to-right';
      default:
        return '';
      }
  }
  
  const getViewDirectionClassName = (hackmanDirection:Direction): string => {
    switch (hackmanDirection) {
      case Direction.Up:
        return ' upView ';
      case Direction.Left:
        return ' leftView ';
      case Direction.Down:
        return ' downView ';
      case Direction.Right:
        return ' rightView ';
      default:
        return ' leftView ';
      }
  };
  
  export {getHackmanAnimationClassName,getViewDirectionClassName}