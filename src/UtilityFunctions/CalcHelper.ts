
import Coin from "../Components/GameFieldComponent/FieldComponents/Path/Coin";
import Snack from "../Components/GameFieldComponent/FieldComponents/Path/Snack";
import Screen from "../Types/Screen"


const CalculateAllCoins = (spielfeld:React.FC<any>[][]):number => {
    let coinsCount:number = 0
    for(let i = 0; i < spielfeld.length; i++){
        let row = spielfeld[i]
        for(let j = 0; j < row.length; j++){
            if(row[j] === Coin || row[j] === Snack){
                coinsCount++
            }
        }
    }
    return coinsCount
}

const GetScreenSize = ():Screen => {
    let body:HTMLElement|null = document.getElementById("root");
    let height:number
    let width:number
    if(body){
        height = body.offsetHeight
        width = body.offsetWidth
        return new Screen(width, height)
    }
    else
        return new Screen(0, 0)
}

const CalcFontSize = (screen:Screen):number => {
    let relation:number = screen.width / screen.height
    let pxValue:number = 0
    if(relation === 2){
        pxValue = screen.width / 40
    }
    else if(relation < 2){
        pxValue = screen.width / 50
    }
    else if(relation > 2){
        pxValue = screen.width / 55
    }
    return pxValue
}



export {CalculateAllCoins, GetScreenSize, CalcFontSize}