

import { useSelector } from "react-redux";

import { State} from "../../State/store";


const Stats: React.FC<any> = () => {

    const eatenCoins = useSelector((state:State)=>state.eatenCoins);
    const remainingLifes = useSelector((state:State)=>state.hackman.remainingLifes);
    

    return <div className="stats container width">
        <p className="stats content fontSize">
            {eatenCoins}•
        </p>
        <p className="stats content fontSize">
            {remainingLifes}♥
        </p>
    </div>
}

export default Stats