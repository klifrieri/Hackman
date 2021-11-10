import "./gameController.css"
import { FaChevronDown, FaChevronLeft, FaChevronRight, FaChevronUp } from "react-icons/fa";

const GameController:React.FC<any> = () => {


    return(
        <div className="gc-wrapper">
            <div className="gc-top">
                <div id="up" className="gc-arrow-up"><FaChevronUp color="white" fontSize="4rem"/></div>
            </div>
            <div className="gc-mid">
            	<div id="left" className="gc-arrow-left"><FaChevronLeft color="white" fontSize="4rem"/></div>
                <div id="right" className="gc-arrow-right"><FaChevronRight color="white" fontSize="4rem"/></div>
            </div>
            <div className="gc-low">
                <div id="down" className="gc-arrow-down"><FaChevronDown color="white" fontSize="4rem"/></div>
            </div>
        </div>
    )
}

export default GameController