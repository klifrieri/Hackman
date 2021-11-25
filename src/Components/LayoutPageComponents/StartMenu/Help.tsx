import { Link } from "react-router-dom";
import "./css/help.css"

const Help: React.FC = () => {
    return (
        <>
            <div className="overlay-heading">HELP</div>
            <div className="overlay-white-text">
                1. Move Hackman with <i>Keyboard-Arrows</i> or <i>W, A, S, D</i>
            </div>
            <div className="overlay-white-text">
                2. Set a Block with <i>SPACE</i> or Jump with <i>SHIFT-L</i>
            </div>
            <div className="overlay-white-text">
                3. Press <i>P</i> for Pause or <i>ESC</i> to open the options
            </div>
            <div className="btn-wrapper">
                <Link className="btn" to="/">Back</Link>
            </div>
        </>
    );
};

export default Help;
