import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import appStateSlice from "../../../State/appState/appStateSlice";
import gameStateSlice from "../../../State/gameState/gameStateSlice";
import { State } from "../../../State/store";
import { CalcFontSize, GetScreenSize } from "../../../UtilityFunctions/CalcHelper";

interface IControlProps {
    action: string;
}

const Control: React.FC<IControlProps> = (props) => {
    const dispatch = useDispatch();
    const { pauseGame, openMenu } = bindActionCreators(appStateSlice.actions, dispatch);
    const action = props.action;
    const [FontSize, SetFontSize] = useState(CalcFontSize(GetScreenSize()));
    const [ButtonSize, SetButtonSize] = useState(FontSize * 2.5);
    const isPaused = useSelector((state: State) => state.appState.isPaused);
    const menu = useSelector((state: State) => state.appState.menu);

    const RenderAll = (): any => {
        SetFontSize(CalcFontSize(GetScreenSize()));
        SetButtonSize(FontSize * 2.5);
    };

    const gameAction = (): any => {
        switch (action) {
            case "pause":
                if (menu === false) {
                    pauseGame(!isPaused);
                }
                break;
            case "menu":
                if (isPaused) {
                    openMenu(!menu);
                } else {
                    openMenu(!menu);
                    pauseGame(!isPaused);
                }
                break;
        }
    };

    useEffect(() => {
        window.addEventListener("resize", RenderAll);
        return () => {
            window.removeEventListener("resize", RenderAll);
        };
    }, [FontSize, ButtonSize]);

    return (
        <div id={action} className="gc-control" style={{ width: ButtonSize * 2, height: ButtonSize, marginTop: FontSize / 4, marginRight: FontSize, marginLeft: FontSize, color: "white" }} onClick={gameAction}>
            {action === "pause" && <div style={{ fontSize: FontSize, fontWeight: 500 }}>PAUSE</div>}
            {action === "menu" && <div style={{ fontSize: FontSize, fontWeight: 500 }}>MENU</div>}
        </div>
    );
};

export default Control;
