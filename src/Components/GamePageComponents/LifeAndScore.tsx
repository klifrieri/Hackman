import ILifeAndScoreProps from "../../Types_Classes/Props/ILifeAndScoreProps";
import './lifeAndScore.css';

const LifeAndScore: React.FC<ILifeAndScoreProps> = (props) => {
     
    return <div className="stats container width">
        <p className="stats content fontSize">
            {props.score}•
        </p>
        <p className="stats content fontSize">
            {props.remainingLifes}♥
        </p>
    </div>
}

export default LifeAndScore