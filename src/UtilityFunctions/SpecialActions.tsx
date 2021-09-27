import React from "react"
import Block from "../Components/GameFieldComponent/FieldComponents/Path/Block"
import Empty from "../Components/GameFieldComponent/FieldComponents/Path/Empty"



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