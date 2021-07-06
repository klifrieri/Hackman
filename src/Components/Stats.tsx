interface IStatsProps {
    eatenCoins : number | undefined,
    remainingLives : number | undefined
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