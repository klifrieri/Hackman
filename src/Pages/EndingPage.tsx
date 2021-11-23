import React, { useEffect } from "react";
import GameOver from "../Components/OverlayComponents/GameOverlays/GameOverOverlay";
import WinOverlay from "../Components/OverlayComponents/GameOverlays/WinOverlay";

const EndingPage: React.FC = () => {
    return (
        <>
            <GameOver />
            <WinOverlay />
        </>
    );
};

export default EndingPage;
