import "./css/helpDialog.css"
import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import gameStateSlice from "../../../../State/gameState/gameStateSlice"
import appStateSlice from "../../../../State/appState/appStateSlice";

const Help: React.FC = () => {

    const dispatch = useDispatch();
    const { backToStartMenu } = bindActionCreators(appStateSlice.actions, dispatch);

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
                <button
                    className="s-overlay-button"
                    onClick={() => backToStartMenu("help")}
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default Help;
