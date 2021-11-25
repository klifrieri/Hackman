import { Link } from "react-router-dom";
import IHighScoreElementProps from "../../../../Types_Classes/Props/IHighscoreElementProps";
import "./css/highscore.css";


const HighscoreElement:React.FC<IHighScoreElementProps> = (props) => {    

    const player = props.player

    return(
        <div className="table-row overlay-text">
        <div>
            {player.ranking}
        </div>
        <div>
            {player.name}
        </div>
        <div>
            {player.score}
        </div>
        <div>
            <Link to="/stats" className="stats-btn">Stats</Link>
        </div>
    </div>
    )
}

export default HighscoreElement