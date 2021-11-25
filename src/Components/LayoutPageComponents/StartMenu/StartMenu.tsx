import { Link } from "react-router-dom";
import Image from "../../../StaticAssets/hackman1.png";
import "./css/startMenu.css";

const StartMenu: React.FC = () => {
    return (
        <>
            <div className="s-overlay-header">
                <div className="s-overlay-header-l orange-text">HAC</div>
                <div className="s-overlay-header-img">
                    <img src={Image} alt="Hackman-Logo" id="image"></img>
                </div>
                <div className="s-overlay-header-r orange-text">MAN</div>
            </div>
            <div className="btn-wrapper">
                <Link to="/game" className="btn">START</Link>
                <Link to="/options" className="btn">OPTIONS</Link>
                <Link to="/help" className="btn">HELP</Link>
            </div>
        </>
    )
}

export default StartMenu;