class Stat {
    
    constructor(eatenCoins : number, remainingLives : number){
        this.eatenCoins = eatenCoins;
        this.remainingLives = remainingLives;
    }
    
    With (eatenCoins : number, remainingLives : number) : Stat{
        return new Stat(eatenCoins, remainingLives);
    }

    eatenCoins: number;
    remainingLives: number;
}

export default Stat