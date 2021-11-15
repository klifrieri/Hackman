import "./gameController.css"
import HackControl from "./HackmanControl";
import { useEffect, useState } from "react";
import { CalcFontSize, GetScreenSize } from "../../../../UtilityFunctions/CalcHelper";
import GameControl from "./GameControl";

const GameController:React.FC<any> = () => {
   
    const [FontSize, SetFontSize] = useState(CalcFontSize(GetScreenSize()))
    const [ButtonSize, SetButtonSize] = useState(FontSize*2.5)
    const [ScreenSize, SetScreenSize] = useState(GetScreenSize())
    const [Margin, SetMargin] = useState(FontSize/4)


    const RenderAll = ():any => {
        SetFontSize(CalcFontSize(GetScreenSize()))
        SetButtonSize(FontSize*2.5)
        SetMargin(FontSize/4)
        SetScreenSize(GetScreenSize())
    }

    useEffect(() => {        
        window.addEventListener("resize", RenderAll)
        return () => {
            window.removeEventListener("resize", RenderAll)
        }
    }, [FontSize, ButtonSize, ScreenSize])


    return(
        <div id="gc-wrapper" style={{height: ScreenSize.height, width: ScreenSize.width}} >
            <div id="gc-element-left" style={{top: ScreenSize.height/3, left: FontSize/2, width: ButtonSize*3 + Margin*6}}>
                <HackControl action={"up"}/>
                <div className="mid" style={{width: ButtonSize*3 + Margin*6}}>
                    <HackControl action={"left"}/>
                    <HackControl action={"right"} />
                </div>          
                <HackControl action={"down"}/>
            </div>
            <div id="gc-element-right" style={{top: ScreenSize.height/3 + ButtonSize, right: FontSize/2, width: ButtonSize*3 + Margin*2}}>
                <HackControl action={"jump"}/>
                <HackControl action={"block"}/>
            </div>
            <div id="gc-element-bottom">
                <GameControl action={"options"}/>
                <GameControl action={"pause"}/>
            </div>
        </div>
    )
}

export default GameController


