import { WritableDraft } from "@reduxjs/toolkit/node_modules/immer/dist/internal";
import BlueGhost from "../../Components/GameFieldComponent/GhostComponents/BlueGhost";
import GreenGhost from "../../Components/GameFieldComponent/GhostComponents/GreenGhost";
import OrangeGhost from "../../Components/GameFieldComponent/GhostComponents/OrangeGhost";
import RedGhost from "../../Components/GameFieldComponent/GhostComponents/RedGhost";
import GhostCharacter from "../../Types/Character/GhostCharacter";
import Moveable from "../../Types/Moveable";

const resetGhostAndSetGameField = (gameField:React.FC<any>[][],hackmanMoveable:Moveable,ghosts:WritableDraft<GhostCharacter[]>)=>{
    switch (hackmanMoveable) {
        case Moveable.GreenGhostEdible:
            ghosts[0].resetToStartPosition();
            gameField[ghosts[0].position.y][ghosts[0].position.x] = GreenGhost;
          break;
          case Moveable.RedGhostEdible:
            ghosts[1].resetToStartPosition();
            gameField[ghosts[0].position.y][ghosts[0].position.x] = RedGhost;
            break;
          case Moveable.OrangeGhostEdible:
            ghosts[2].resetToStartPosition();
            gameField[ghosts[0].position.y][ghosts[0].position.x] = OrangeGhost;
          break;
          case Moveable.BlueGhostEdible:
            ghosts[3].resetToStartPosition();
            gameField[ghosts[0].position.y][ghosts[0].position.x] = BlueGhost;
            break;
      }
      return gameField;
}

export default resetGhostAndSetGameField;