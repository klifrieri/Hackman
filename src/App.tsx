import Field from './Components/Field'
import {FieldType} from './Types/FieldType'


let scWidth: number = window.innerWidth;
let scHeight: number = window.innerHeight;

const fieldWidth: number = 50;
const fieldHeight: number = 50;

let countFieldsHeight: number = Math.floor(scHeight / fieldHeight);
let countFieldsWidth: number = Math.floor(scWidth / fieldWidth);

console.log(countFieldsHeight);
console.log(countFieldsWidth);




// let spielFeld:number[][] = [
// [3,1,1,1,1,1,1,1,1,3],
// [2,15,9,9,9,9,9,9,9,2],
// [2,9,12,4,4,7,12,12,4,2],
// [2,12,4,4,4,10,6,9,4,2],
// [2,9,4,4,10,11,5,9,4,2],
// [2,9,4,10,11,9,8,9,4,2],
// [2,9,11,11,5,9,4,11,10,2],
// [2,9,10,11,8,9,4,4,11,2],
// [2,9,9,9,9,9,4,9,9,2],
// [3,1,1,1,1,1,1,1,1,3]
// ]
let spielFeld:FieldType[][] = [
[FieldType.wand,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.wand],
[FieldType.wand,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.wand,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.wand,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.wand,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.wand],
[FieldType.wand,FieldType.coin,FieldType.wand,FieldType.wand,FieldType.coin,FieldType.wand,FieldType.coin,FieldType.wand,FieldType.wand,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.wand,FieldType.wand,FieldType.coin,FieldType.wand,FieldType.coin,FieldType.wand,FieldType.wand,FieldType.coin,FieldType.wand],
[FieldType.wand,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.wand,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.wand],
[FieldType.wand,FieldType.wand,FieldType.coin,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.coin,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.coin,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.coin,FieldType.wand,FieldType.wand],
[FieldType.wand,FieldType.wand,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.wand,FieldType.wand],
[FieldType.wand,FieldType.wand,FieldType.coin,FieldType.wand,FieldType.coin,FieldType.wand,FieldType.wand,FieldType.coin,FieldType.wand,FieldType.wand,FieldType.noco,FieldType.wand,FieldType.wand,FieldType.coin,FieldType.wand,FieldType.wand,FieldType.coin,FieldType.wand,FieldType.coin,FieldType.wand,FieldType.wand],
[FieldType.noco,FieldType.noco,FieldType.coin,FieldType.wand,FieldType.coin,FieldType.wand,FieldType.wand,FieldType.coin,FieldType.wand,FieldType.noco,FieldType.noco,FieldType.noco,FieldType.wand,FieldType.coin,FieldType.wand,FieldType.wand,FieldType.coin,FieldType.wand,FieldType.coin,FieldType.noco,FieldType.noco],
[FieldType.wand,FieldType.wand,FieldType.coin,FieldType.wand,FieldType.coin,FieldType.wand,FieldType.wand,FieldType.coin,FieldType.wand,FieldType.noco,FieldType.noco,FieldType.noco,FieldType.wand,FieldType.coin,FieldType.wand,FieldType.wand,FieldType.coin,FieldType.wand,FieldType.coin,FieldType.wand,FieldType.wand],
[FieldType.noco,FieldType.noco,FieldType.coin,FieldType.wand,FieldType.coin,FieldType.wand,FieldType.wand,FieldType.coin,FieldType.wand,FieldType.noco,FieldType.noco,FieldType.noco,FieldType.wand,FieldType.coin,FieldType.wand,FieldType.wand,FieldType.coin,FieldType.wand,FieldType.coin,FieldType.noco,FieldType.noco],
[FieldType.wand,FieldType.wand,FieldType.coin,FieldType.wand,FieldType.coin,FieldType.wand,FieldType.wand,FieldType.coin,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.coin,FieldType.wand,FieldType.wand,FieldType.coin,FieldType.wand,FieldType.coin,FieldType.wand,FieldType.wand],
[FieldType.wand,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.wand,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.wand],
[FieldType.wand,FieldType.coin,FieldType.wand,FieldType.wand,FieldType.coin,FieldType.wand,FieldType.coin,FieldType.wand,FieldType.wand,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.wand,FieldType.wand,FieldType.coin,FieldType.wand,FieldType.coin,FieldType.wand,FieldType.wand,FieldType.coin,FieldType.wand],
[FieldType.wand,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.wand,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.wand,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.wand,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.coin,FieldType.wand],
[FieldType.wand,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.wand,FieldType.wand]
]

const App: React.FC = () => {
  let test:number
  return (
     <div className="App">
       {spielFeld.map((reihe,ix) => {                     
           return(
            <div style={{height: 50}}>
            {reihe.map((feld,iy)=>{
               return <Field type={
                feld === FieldType.wand ? FieldType.wand :
                feld === FieldType.coin ? FieldType.coin : FieldType.noco 
              } />
             })}
             </div>
           )
        })}
     </div>
  )
}

export default App;
