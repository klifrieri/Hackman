import { useSelector } from "react-redux";
import { State } from "../../State/store";
import './stats.css';

const Stats: React.FC<any> = () => {
    const eatenCoins = useSelector((state:State)=>state.eatenCoins)
    const remainingLives:number = 3;
    return <div className="stats container">
        <p className="stats content">
            {eatenCoins}•
        </p>
        <p className="stats content">
            {remainingLives}♥
        </p>
    </div>
}

export default Stats