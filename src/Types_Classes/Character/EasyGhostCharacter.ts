import { FC } from "react";
import CharacterIdentifier from "./Models/CharacterIdentifier";
import Direction from "./Models/Direction";
import Moveable from "./Models/Moveable";
import GhostCharacter from "./Base/GhostCharacter";
import { getRandomNumber } from "../../UtilityFunctions/CalcHelper";

class EasyGhostCharacter extends GhostCharacter {
    private _declaredCount: number;
    public set declaredCount(value: number) {
        this._declaredCount = value;
        this.resetCount();
    }

    private _count: number;
    private incrementCount() {
        this._count++;
    }
    private resetCount() {
        this._count = 0;
    }
    public needsNewCountDeclaration(): boolean {
        return this._declaredCount === this._count;
    }

    constructor(name: CharacterIdentifier, positionY: number, positionX: number) {
        super(name, positionY, positionX);
        this._declaredCount = 0;
        this._count = 0;
    }

    public override changeCharacterPosition(){
        super.changeCharacterPosition();
        this.incrementCount();
    }


    private getPossibleDirections(gameField: FC<any>[][]): { direction: Direction; bewegungMoeglich: Moveable; }[] {
        let _canMoveUp = {
            direction: Direction.Up,
            bewegungMoeglich: this.canMoveUp(gameField)
        };
        let _canMoveDown = {
            direction: Direction.Down,
            bewegungMoeglich: this.canMoveDown(gameField)
        };
        let _canMoveLeft = {
            direction: Direction.Left,
            bewegungMoeglich: this.canMoveLeft(gameField)
        };
        let _canMoveRight = {
            direction: Direction.Right,
            bewegungMoeglich: this.canMoveRight(gameField)
        };

        let canMoveDirections: { direction: Direction; bewegungMoeglich: Moveable; }[] = [];

        if (_canMoveUp.bewegungMoeglich !== Moveable.No) {
            canMoveDirections.push(_canMoveUp);
        }
        if (_canMoveDown.bewegungMoeglich !== Moveable.No) {
            canMoveDirections.push(_canMoveDown);
        }
        if (_canMoveLeft.bewegungMoeglich !== Moveable.No) {
            canMoveDirections.push(_canMoveLeft);
        }
        if (_canMoveRight.bewegungMoeglich !== Moveable.No) {
            canMoveDirections.push(_canMoveRight);
        }
        return canMoveDirections;
    }
    private setRandomDirectionAndCount(canMoveDirections: { direction: Direction; bewegungMoeglich: Moveable; }[]) {
        let max = 7, min = 1;
        let tryBreakOutAfter: number = getRandomNumber(min, max);

        if (canMoveDirections.length === 0) {
            this._direction = Direction.Nothing;
            this._moveable = Moveable.No;
            return;
        }
        else if (canMoveDirections.length === 1) {
            this._direction = canMoveDirections[0].direction;
            this._moveable = canMoveDirections[0].bewegungMoeglich;
        }
        else {
            let index = getRandomNumber(0, canMoveDirections.length);
            this._direction = canMoveDirections[index].direction;
            this._moveable = canMoveDirections[index].bewegungMoeglich;
        }
        this._declaredCount = tryBreakOutAfter;
    }

    public override determineNextMove(gameField: FC<{}>[][]): FC<any>[][] {
        if (this._inCage) {
            this.goOutOfCage(gameField);
        }
        else{
            if (this.needsNewCountDeclaration() || this._moveable === Moveable.No) {
                const canMoveDirections: { direction: Direction; bewegungMoeglich: Moveable; }[] = this.getPossibleDirections(gameField);
                this.setRandomDirectionAndCount(canMoveDirections);
            }
            else {
                this.determineIfMoveable(gameField);
            }
            this.changeCharacterPosition();
        }
        return this.setTemporaryGameField(gameField);
    }
}

export default EasyGhostCharacter;