interface IStatsProps {
    eatenCoins : number,
    remainingLives : number
}

const Stats: React.FC<IStatsProps> = (props) => {
    return <div className="statsContainer">
        <p className="statsProp">
            {props.eatenCoins}•
        </p>
        <p className="statsProp">
            {props.remainingLives}♥
        </p>
    </div>
}

export default Stats