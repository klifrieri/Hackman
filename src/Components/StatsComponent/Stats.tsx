import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import gameFieldSlice from "../../State/slices/gameFieldSlice";
import { State, store } from "../../State/store";


const Stats: React.FC<any> = () => {

    const dispatch = useDispatch();
    const { resetStats } = bindActionCreators(
        gameFieldSlice.actions,
        dispatch
    );

    const eatenCoins = useSelector((state:State)=>state.eatenCoins);
    const remainingLifes = useSelector((state:State)=>state.hackman.remainingLifes);
    

    useEffect(() => {
        if(remainingLifes === 0){
            store.dispatch(resetStats)
        }     
    })
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