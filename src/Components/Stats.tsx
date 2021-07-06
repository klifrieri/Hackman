interface IStatsProps {
    eatenCoins : number,
    remainingLives : number
}

const Stats: React.FC<IStatsProps> = (props) => {
    return <div className="stats container">
        <p className="stats content">
            {props.eatenCoins}•
        </p>
        <p className="stats content">
            {props.remainingLives}♥
        </p>
    </div>
}

export default Stats