import HighscoreTable from "./HighscoreChildComponents/HighscoreTable";
import "./HighscoreChildComponents/css/highscores.css";
import { Link } from "react-router-dom";

const Highscores: React.FC = () => {
    return (
        <>
            <h1 className="blink-animation">Highscores</h1>
            <HighscoreTable />
            <div className="btn-wrapper flex-columns">
                <Link to="/" className="btn">Back</Link>
            </div>
        </>
    );
};

export default Highscores;
