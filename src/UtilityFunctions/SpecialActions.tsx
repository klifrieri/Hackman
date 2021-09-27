import React from "react"
import { useSelector } from "react-redux"
import Block from "../Components/GameFieldComponent/FieldComponents/Path/Block"
import Empty from "../Components/GameFieldComponent/FieldComponents/Path/Empty"
import Ghost1 from "../Components/GameFieldComponent/GhostComponents/Ghost1"
import Ghost2 from "../Components/GameFieldComponent/GhostComponents/Ghost2"
import Ghost3 from "../Components/GameFieldComponent/GhostComponents/Ghost3"
import Ghost4 from "../Components/GameFieldComponent/GhostComponents/Ghost4"
import { State } from "../State/store"


const noGhost = (blockY:number, blockX:number, gameField:React.FC<{}>[][]):boolean => {
    if(gameField[blockY][blockX] === Empty)
        return true
    else
        return false
}

const setGameField = (blockY:number, blockX:number, gameField:React.FC<{}>[][]): React.FC<any>[][] => {
    gameField[blockY][blockX] = Empty
    return gameField
}

const generateBlockOnGameField = (blockY:number, blockX:number, canSetBlock:boolean, gameField:React.FC<{}>[][]): React.FC<any>[][] => {    
    if(canSetBlock && noGhost(blockY, blockX, gameField)){
        gameField[blockY][blockX] = Block
    }
    return gameField
}

const resetBlockTimer = (canSetBlock:boolean): any => {
    canSetBlock = !canSetBlock  
}


export {generateBlockOnGameField, resetBlockTimer, setGameField}