import Player from "../../Types/Player"

interface IHighScoreElementProps{
    player:Player;
}

const HighscoreElement:React.FC<IHighScoreElementProps> = (props) => {    

    const player = props.player

    return(
        <div className="hs-element">
            <p className="hs-ranking">{player.ranking}.</p>
            <p>{player.name}</p>
            <p>{player.score}</p>
        </div>
    )
}

export default HighscoreElement