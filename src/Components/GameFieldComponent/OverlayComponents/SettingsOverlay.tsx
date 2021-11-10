import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { State } from "../../../State/store";
import './settingsOverlay.css';


const Overlay: React.FC = () => {

    const options: boolean = useSelector((state: State) => state.options);

    const [DisplayOverlay, SetDisplayOverlay] = useState("overlay-wrapper show-overlay")
    

    useEffect(() => {
        
        if(options)
            SetDisplayOverlay("overlay-wrapper show-overlay")
        else
            SetDisplayOverlay("overlay-wrapper hide-overlay")

    }, [options])

    return(
        <div className={DisplayOverlay}>
            <div className="overlay-box">
                <h2>Hey!</h2>
            </div>
        </div>
    )
} 

export default Overlay