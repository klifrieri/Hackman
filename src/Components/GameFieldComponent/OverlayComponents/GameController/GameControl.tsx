import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import gameFieldSlice from "../../../../State/slices/gameFieldSlice";
import { State, store } from "../../../../State/store";
import { CalcFontSize, GetScreenSize } from "../../../../UtilityFunctions/CalcHelper";

interface IControlProps{
    action:string
}

const Control:React.FC<IControlProps> = (props) => {

    const dispatch = useDispatch();
    const { pauseGame, openOptions} = bindActionCreators(gameFieldSlice.actions, dispatch);
    const action = props.action
    const [FontSize, SetFontSize] = useState(CalcFontSize(GetScreenSize()))
    const [ButtonSize, SetButtonSize] = useState(FontSize * 2.5)
    const isPaused = useSelector((state: State) => state.isPaused);
    const options = useSelector((state: State) => state.settings);

    const RenderAll = ():any => {
        SetFontSize(CalcFontSize(GetScreenSize()))
        SetButtonSize(FontSize * 2.5)
    }

    const gameAction = ():any => {
        switch(action){            
            case "pause":
                if(options === false){
                    store.dispatch(pauseGame(!isPaused));
                }
                break
            case "options":
                if(isPaused){
                    store.dispatch(openOptions(!options));
                }
                else{
                    store.dispatch(openOptions(!options));
                    store.dispatch(pauseGame(!isPaused));
                }
                break
        }
    }

    useEffect(() => {        
        window.addEventListener("resize", RenderAll)
        return () => {
            window.removeEventListener("resize", RenderAll)
        }
    }, [FontSize, ButtonSize])


    return(
        
        <div id={action} className="gc-control" style={{width: ButtonSize * 2, height: ButtonSize, marginTop: FontSize/4, marginRight: FontSize, marginLeft: FontSize, color: "white"}} onClick={gameAction}>            
            {action === "pause" &&
                <div style={{fontSize: FontSize, fontWeight: 500}}>PAUSE</div>
            }
            {action === "options" &&
                <div style={{fontSize: FontSize, fontWeight: 500}}>OPTIONS</div>
            }
        </div>


    )
}

export default Control