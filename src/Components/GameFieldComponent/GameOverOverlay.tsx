import "./gameOverOverlay.css"

const GameOver:React.FC = () => {

    let message: string = "hallo du noob"

    return(
        <div className="go-overlay-wrapper">
            <div className="go-overlay-box">
                <p>{message}</p>
                <button id="restart-game">
                    Neues Spiel
                </button>
            </div>
        </div>
    )
}

export default GameOver