import { CSSProperties, useEffect, useState } from "react"
import { CalcFontSize, GetScreenSize } from "../../UtilityFunctions/CalcHelper"


const PauseOverlay:React.FC = () => {
    const [FontSize, SetFontSize] = useState(CalcFontSize(GetScreenSize()))
    const RenderAll = () =>{
        SetFontSize(CalcFontSize(GetScreenSize()))
    }

    useEffect(() => {        
        window.addEventListener("resize", RenderAll)
        return () => {
            window.removeEventListener("resize", RenderAll)
        }
    }, [FontSize])

    const text:CSSProperties = {
        fontSize: FontSize*3,
        color: "rgb(229, 0, 0)",
        textShadow: "0px 0px 100px white"
    }
    const wrapper:CSSProperties = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9003,
        width: "100vw",
        height: "75vh",
        position: "absolute",
        top: 0,
        left: 0
    }

    return(
        <div>
            <div style={wrapper}>
                <h1 style={text}>PAUSE</h1>
            </div>
        </div>
    )
}

export default PauseOverlay