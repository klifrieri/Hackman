import { Link } from "react-router-dom";
import Image from "../../IMG/hackman1.png";
import "./css/lpStartMenu.css";

const LpStartMenu: React.FC = () => {

    return (
        <div className="s-overlay-menu">
            <div className="s-overlay-header">
                <div className="s-overlay-header-l s-text">HAC</div>
                <div className="s-overlay-header-img">
                    <img src={Image} alt="Hackman-Logo" id="image"></img>
                </div>
                <div className="s-overlay-header-r s-text">MAN</div>
            </div>
            <div className="s-overlay-buttons">
             <Link to="/game" className="s-overlay-button">START</Link> 
                <Link to="/options" className="s-overlay-button">OPTIONS</Link>
                <Link to="/help" className="s-overlay-button">HELP</Link>
            </div>
        </div>
    )
}

export default LpStartMenu;