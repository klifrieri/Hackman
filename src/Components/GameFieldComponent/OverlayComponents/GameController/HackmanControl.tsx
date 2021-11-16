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
    const [ButtonSize, SetButtonSize] = useState(FontSize * 2.5)

    const RenderAll = ():any => {
        SetFontSize(CalcFontSize(GetScreenSize()))
        SetButtonSize(FontSize * 2.5)
    }

    const playerAction = ():any => {
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
    }, [FontSize, ButtonSize])


    return(
        
        <div id={action} className="gc-icon" style={{width: ButtonSize, height: ButtonSize, marginTop: FontSize/4, marginBottom: FontSize/4, color: "white"}} onClick={playerAction}>
            {action === "up" &&
                <FaChevronUp fontSize={FontSize}/>                  
            }
            {action === "down" &&
                <FaChevronDown fontSize={FontSize}/>
            }
            {action === "left" &&
                <FaChevronLeft fontSize={FontSize}/>
            }
            {action === "right" &&
                <FaChevronRight fontSize={FontSize}/>
            }
            {action === "jump" &&
                <div style={{fontSize: FontSize/1.75, fontWeight: 500}}>JUMP</div>
            }
            {action === "block" &&
                <div style={{fontSize: FontSize/1.75, fontWeight: 500}}>BLOCK</div>
            }
        </div>


    )
}

export default Control