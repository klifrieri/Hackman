
import Coin from "../Components/GameFieldComponent/FieldComponents/Path/Coin";
import Snack from "../Components/GameFieldComponent/FieldComponents/Path/Snack";


const CalculateAllCoins = (spielfeld:React.FC<any>[][]):number => {
    let coinsCount:number = 0
    for(let i = 0; i < spielfeld.length; i++){
        let row = spielfeld[i]
        for(let j = 0; j < row.length; j++){
            if(row[j] === Coin){
                coinsCount++
            }
        }
    }
    return coinsCount
}
const CalculateAllSnacks = (spielfeld:React.FC<any>[][]):number => {
    let snacksCount:number = 0
    for(let i = 0; i < spielfeld.length; i++){
        let row = spielfeld[i]
        for(let j = 0; j < row.length; j++){
            if(row[j] === Snack){
                snacksCount++
            }
        }
    }
    return snacksCount
}

export {CalculateAllCoins, CalculateAllSnacks}