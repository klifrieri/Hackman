import React from "react"
import Block from "../Components/GameFieldComponent/FieldComponents/Path/Block"
import Empty from "../Components/GameFieldComponent/FieldComponents/Path/Empty"


const setGameField = (blockY:number, blockX:number, gameField:React.FC<{}>[][]): React.FC<any>[][] => {
    gameField[blockY][blockX] = Empty
    return gameField
}

const generateBlockOnGameField = (blockY:number, blockX:number, gameField:React.FC<{}>[][]): React.FC<any>[][] => {    
    gameField[blockY][blockX] = Block
    return gameField
}


export {generateBlockOnGameField, setGameField}