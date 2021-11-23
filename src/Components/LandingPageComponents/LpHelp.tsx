import { Link } from "react-router-dom";
import "./css/lpHelp.css"

const LpHelp: React.FC = () => {

    return (
        <div className="s-overlay-help">
            <div className="s-help-h">HELP</div>
            <div className="s-help-t">
                1. Move Hackman with <i>Keyboard-Arrows</i> or <i>W, A, S, D</i>
            </div>
            <div className="s-help-t">
                2. Set a Block with <i>SPACE</i> or Jump with <i>SHIFT-L</i>
            </div>
            <div className="s-help-t">
                3. Press <i>P</i> for Pause or <i>ESC</i> to open the options
            </div>
            <div className="s-overlay-buttons">
                <Link className="s-overlay-button" to="/hackman">Back</Link>
            </div>
        </div>
    );
};

export default LpHelp;
