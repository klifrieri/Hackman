import Block from "../Components/GameFieldComponent/FieldComponents/Path/Block"
import Ghost1 from "../Components/GameFieldComponent/GhostComponents/Ghost1"
import Ghost2 from "../Components/GameFieldComponent/GhostComponents/Ghost2"
import Ghost3 from "../Components/GameFieldComponent/GhostComponents/Ghost3"
import Ghost4 from "../Components/GameFieldComponent/GhostComponents/Ghost4"


const noGhost = (blockY:number, blockX:number, gameField:React.FC<{}>[][]):boolean => {
    if(gameField[blockY][blockX] !== Ghost1 || gameField[blockY][blockX] !== Ghost2 || gameField[blockY][blockX] !== Ghost3 || gameField[blockY][blockX] !== Ghost4)
        return true
    else
        return false
}

const generateBlockOnGameField = (blockY:number, blockX:number, canSetBlock:boolean, gameField:React.FC<{}>[][]): React.FC<any>[][] => {    
    if(canSetBlock && noGhost(blockY, blockX, gameField)){
        gameField[blockY][blockX] = Block
    }
    return gameField
}



export {generateBlockOnGameField}