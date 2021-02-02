import Field from './Components/Field'

let spielFeld:number[][] = [
[1,1,1,1,1],
[1,2,2,2,1],
[1,2,1,2,1],
[1,2,2,2,1],
[1,1,1,1,1],
]

const App: React.FC = () => {
  let test:number
  return (
     <div className="App">
       {spielFeld.map((reihe,ix) => {                     
           return(
             <div>
             {reihe.map((feld,iy)=>{
               return <Field type={feld === 1 ? "wand" : "feld"} />
             })}
             </div>
           )
        })}
     </div>
  )
}

export default App;
