import { useSelector } from "react-redux";
import { State } from "../../State/store";
const Stats: React.FC<any> = () => {
    const eatenCoins = useSelector((state:State)=>state.eatenCoins)
    const remainingLives:number = 3;
    return <div className="stats container width">
        <p className="stats content fontSize">
            {eatenCoins}•
        </p>
        <p className="stats content fontSize">
            {remainingLives}♥
        </p>
    </div>
}

export default Stats