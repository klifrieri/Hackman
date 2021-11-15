import "./gameController.css"
import Control from "./Control";
import { useEffect, useState } from "react";
import { CalcFontSize, GetScreenSize } from "../../../../UtilityFunctions/CalcHelper";

const GameController:React.FC<any> = () => {
   
    const [FontSize, SetFontSize] = useState(CalcFontSize(GetScreenSize()))
    const [ButtonSize, SetButtonSize] = useState(FontSize*2)
    const [ScreenSize, SetScreenSize] = useState(GetScreenSize())
    const [Margin, SetMargin] = useState(FontSize/4)


    const RenderAll = ():any => {
        SetFontSize(CalcFontSize(GetScreenSize()))
        SetButtonSize(FontSize*2)
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
            <div id="gc-element-left" style={{top: ScreenSize.height/3, left: FontSize/2, width: ButtonSize*3+Margin*6}}>
                <Control action={"up"}/>
                <div className="mid" style={{width: ButtonSize*3+Margin*6}}>
                    <Control action={"left"}/>
                    <Control action={"right"} />
                </div>           

                <Control action={"down"}/>
            </div>
            <div id="gc-element-right" style={{top: ScreenSize.height/3+ButtonSize, right: FontSize/2, width: ButtonSize*3+Margin*2}}>
                <Control action={"jump"}/>
                <Control action={"block"}/>
            </div>
        </div>
    )
}

export default GameController


