import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronLeft, FaChevronRight, FaChevronUp } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import gameFieldSlice from "../../../../State/slices/gameFieldSlice";
import { store } from "../../../../State/store";
import Direction from "../../../../Types/Direction";
import { CalcFontSize, GetScreenSize } from "../../../../UtilityFunctions/CalcHelper";

interface IControlProps{
    action:string
}

const Control:React.FC<IControlProps> = (props) => {

    const dispatch = useDispatch();
    const { changeIsMoveableHackman, setBlock, hackmanJump, } = bindActionCreators(gameFieldSlice.actions, dispatch);

    const action = props.action
    const [FontSize, SetFontSize] = useState(CalcFontSize(GetScreenSize()))
    const [ButtonSize, SetButtonSize] = useState(FontSize * 2)

    const RenderAll = ():any => {
        SetFontSize(CalcFontSize(GetScreenSize()))
        SetButtonSize(FontSize * 2)
    }

    const Move = () => {
        switch(action){
            case "up":
                store.dispatch(changeIsMoveableHackman(Direction.Up))
                break
            case "down":
                store.dispatch(changeIsMoveableHackman(Direction.Down))
                break
            case "left":
                store.dispatch(changeIsMoveableHackman(Direction.Left))
                break
            case "right":
                store.dispatch(changeIsMoveableHackman(Direction.Right))
                break
            case "jump":
                store.dispatch(hackmanJump)
                break
            case "block":
                store.dispatch(setBlock)
                break
        }
    }

    useEffect(() => {        
        window.addEventListener("resize", RenderAll)
        return () => {
            window.removeEventListener("resize", RenderAll)
        }
    }, [FontSize])


    return(

        <div id={action} className="gc-icon" style={{width: ButtonSize, height: ButtonSize, marginTop: FontSize/4, marginBottom: FontSize/4}}>
            {action === "up" &&
                <FaChevronUp fontSize={FontSize} color="white" onClick={Move} />                  
            }
            {action === "down" &&
                <FaChevronDown fontSize={FontSize} color="white" onClick={Move} />
            }
            {action === "left" &&
                <FaChevronLeft fontSize={FontSize} color="white" onClick={Move}/>
            }
            {action === "right" &&
                <FaChevronRight fontSize={FontSize} color="white" onClick={Move}/>
            }
            {action === "jump" &&
                <div style={{fontSize: FontSize/1.75, color: "white"}} onClick={Move}>JUMP</div>
            }
            {action === "block" &&
                <div style={{fontSize: FontSize/1.75, color: "white"}} onClick={Move}>BLOCK</div>
            }
        </div>


    )
}

export default Control