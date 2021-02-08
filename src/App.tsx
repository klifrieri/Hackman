import Field from './Components/Field'



let scWidth: number = window.innerWidth;
let scHeight: number = window.innerHeight;

const fieldWidth: number = 50;
const fieldHeight: number = 50;

let countFieldsHeight: number = Math.floor(scHeight / fieldHeight);
let countFieldsWidth: number = Math.floor(scWidth / fieldWidth);

console.log(countFieldsHeight);
console.log(countFieldsWidth);




let spielFeld:number[][] = [
[3,1,1,1,1,1,1,1,1,3],
[2,15,9,9,9,9,9,9,9,2],
[2,9,12,4,4,7,12,12,4,2],
[2,12,4,4,4,10,6,9,4,2],
[2,9,4,4,10,11,5,9,4,2],
[2,9,4,10,11,9,8,9,4,2],
[2,9,11,11,5,9,4,11,10,2],
[2,9,10,11,8,9,4,4,11,2],
[2,9,9,9,9,9,4,9,9,2],
[3,1,1,1,1,1,1,1,1,3]
]

const App: React.FC = () => {
  let test:number
  return (
     <div className="App">
       {spielFeld.map((reihe,ix) => {                     
           return(
            <div style={{height: ix === 0 ? 10 : ix === (spielFeld.length -1) ? 10 : 50, marginTop: ix === (spielFeld.length -1) ? -7 : 0, marginBottom: ix === 0 ? 7 : 0}}>
            {reihe.map((feld,iy)=>{
               return <Field type={
                feld === 1 ? "wandX" :
                feld === 2 ? "wandY" :
                feld === 3 ? "wandEcke":     
                feld === 4 ? "eckeLinks":
                feld === 5 ? "eckeRechts":
                feld === 6 ? "eckeObenRechts":
                feld === 7 ? "eckeObenLinks":
                feld === 8 ? "eckeUntenRechts":
                feld === 10 ? "eckeUntenLinks":
                feld === 11 ? "eckeUnten":
                feld === 12 ? "eckeOben":
                feld === 13 ? "eckeRund":
                "feld"
              } />
             })}
             </div>
           )
        })}
     </div>
  )
}

export default App;
