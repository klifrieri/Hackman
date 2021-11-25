import { Link } from "react-router-dom";
import "./css/help.css"

const Help: React.FC = () => {
    return (
        <>
            <h1>HELP</h1>
            <p>
                1. Move Hackman with <i>Keyboard-Arrows</i> or <i>W, A, S, D</i>
            </p>
            <p>
                2. Set a Block with <i>SPACE</i> or Jump with <i>SHIFT-L</i>
            </p>
            <p>
                3. Press <i>P</i> for Pause or <i>ESC</i> to open the options
            </p>
            <div className="btn-wrapper flex-columns">
                <Link className="btn" to={"/" + process.env.REACT_APP_URL}>Back</Link>
            </div>
        </>
    );
};

export default Help;
