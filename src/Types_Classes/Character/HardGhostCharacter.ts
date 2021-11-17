import { FC } from "react";
import CharacterIdentifier from "./Models/CharacterIdentifier";
import Coordinate from "./Models/Coordinate";
import Direction from "./Models/Direction";
import Moveable from "./Models/Moveable";
import MovementDirection from "./Models/MovementDirection";
import GhostCharacter from "./Base/GhostCharacter";
import HackmanCharacter from "./HackmanCharacter";
import Observer from "./Observer/Observer";
import Subject from "./Observer/Subject";

class HardGhostCharacter extends GhostCharacter implements Observer {
    private _movementDirection: MovementDirection;
    public get movementDirection() {
        return this._movementDirection;
    }
    public set movementDirection(value: MovementDirection) {
        this._movementDirection = value;
    }

    private _hackmanPosition: Coordinate;

    constructor(name: CharacterIdentifier, positionY: number, positionX: number, hackmanPositionY: number, hackmanPositionX: number) {
        super(name, positionY, positionX);
        this._hackmanPosition = new Coordinate(hackmanPositionY, hackmanPositionX);
        this._movementDirection = MovementDirection.None;
    }

    private getMovementDirectionByPosition(): MovementDirection {
        const underHackman = this._position.y > this._hackmanPosition.y;
        const toTheleftOfHackman = this._position.x < this._hackmanPosition.x;
        const samePostionY = this._position.y === this._hackmanPosition.y;
        const samePostionX = this._position.x === this._hackmanPosition.x;
        if (underHackman && samePostionX) {
            return MovementDirection.North;
        }
        else if (underHackman && toTheleftOfHackman) {
            return MovementDirection.NorthEast;
        }
        else if (underHackman && !toTheleftOfHackman) {
            return MovementDirection.NorthWest;
        }
        else if (!underHackman && samePostionX) {
            return MovementDirection.South;
        }
        else if (!underHackman && toTheleftOfHackman) {
            return MovementDirection.SouthEast;
        }
        else if (!underHackman && !toTheleftOfHackman) {
            return MovementDirection.SouthWest;
        }
        else if (samePostionY && !toTheleftOfHackman) {
            return MovementDirection.West;
        }
        else if (samePostionY && toTheleftOfHackman) {
            return MovementDirection.East;
        }
        else {
            return MovementDirection.None;
        }
    }
    private getMovementDirectionByPositionRevert(): MovementDirection {
        const yIsUnderHackman = this._position.y > this._hackmanPosition.y;
        const xIsLeftSideOfHackman = this._position.x < this._hackmanPosition.x;
        const samePostionY = this._position.y === this._hackmanPosition.y;
        const samePostionX = this._position.x === this._hackmanPosition.x;

        if (yIsUnderHackman && samePostionX) {
            if ((this._hackmanPosition.y - this._position.y) < -4) {
                return MovementDirection.North;
            }
            else {
                return MovementDirection.South
            }
        }
        else if (yIsUnderHackman && xIsLeftSideOfHackman) {
            if ((this._hackmanPosition.y - this._position.y) < -4 || (this._hackmanPosition.x - this._position.x) > 5) {
                return MovementDirection.NorthEast
            }
            else {
                return MovementDirection.SouthWest;
            }
        }
        else if (yIsUnderHackman && !xIsLeftSideOfHackman) {
            if ((this._hackmanPosition.y - this._position.y) < -4 || (this._position.x - this._hackmanPosition.x > 5)) {
                return MovementDirection.NorthWest
            }
            else {
                return MovementDirection.SouthEast;
            }
        }
        else if (!yIsUnderHackman && samePostionX) {
            if ((this._hackmanPosition.y - this._position.y) > 4) {
                return MovementDirection.South
            }
            else {
                return MovementDirection.North;
            }
        }
        else if (!yIsUnderHackman && xIsLeftSideOfHackman) {
            if ((this._hackmanPosition.y - this._position.y) > 4 || (this._hackmanPosition.x - this._position.x) > 5) {
                return MovementDirection.SouthEast
            }
            else {
                return MovementDirection.NorthWest;
            }
        }
        else if (!yIsUnderHackman && !xIsLeftSideOfHackman) {
            if ((this._hackmanPosition.y - this._position.y) > 4 || (this._position.x - this._hackmanPosition.x) > 5) {
                return MovementDirection.SouthWest
            }
            else {
                return MovementDirection.NorthEast;
            }
        }
        else if (samePostionY && xIsLeftSideOfHackman) {
            if ((this._position.x - this._hackmanPosition.x) > 5) {
                return MovementDirection.West
            }
            else {
                return MovementDirection.East;
            }
        }
        else if (samePostionY && !xIsLeftSideOfHackman) {
            if ((this._hackmanPosition.y - this._position.y) > 4) {
                return MovementDirection.East
            }
            else {
                return MovementDirection.West;
            }
        }
        else {
            return MovementDirection.None;
        }
    }
    private setDirectionAndMoveable(direction: Direction, moveable: Moveable) {
        this._direction = direction;
        this._moveable = moveable;
    }
    private getDirectionByMovementDirection(gameField: FC<{}>[][]) {
        const canMoveUp: Moveable = this.canMoveUp(gameField);
        const canMoveLeft: Moveable = this.canMoveLeft(gameField);
        const canMoveRight: Moveable = this.canMoveRight(gameField);
        const canMoveDown: Moveable = this.canMoveDown(gameField);


        switch (this._movementDirection) {
            case MovementDirection.North:
                if (canMoveUp !== Moveable.No) {
                    this.setDirectionAndMoveable(Direction.Up, canMoveUp);
                }
                else if (canMoveRight !== Moveable.No) {
                    this.setDirectionAndMoveable(Direction.Right, canMoveRight);
                }
                else if (canMoveLeft !== Moveable.No) {
                    this.setDirectionAndMoveable(Direction.Left, canMoveLeft);
                }
                else {
                    this.setDirectionAndMoveable(Direction.Nothing, Moveable.No);
                }
                break;
            case MovementDirection.NorthEast:
                if (canMoveRight !== Moveable.No) {
                    this.setDirectionAndMoveable(Direction.Right, canMoveRight);
                }
                else if (canMoveUp !== Moveable.No) {
                    this.setDirectionAndMoveable(Direction.Up, canMoveUp);
                }
                else if (this.canMoveDown(gameField) !== Moveable.No) {
                    this.setDirectionAndMoveable(Direction.Down, canMoveDown);
                }
                else {
                    this.setDirectionAndMoveable(Direction.Nothing, Moveable.No);
                }
                break;
            case MovementDirection.NorthWest:
                if (canMoveUp !== Moveable.No) {
                    this.setDirectionAndMoveable(Direction.Up, canMoveUp);
                }
                else if (canMoveLeft !== Moveable.No) {
                    this.setDirectionAndMoveable(Direction.Left, canMoveLeft);
                }
                else if (canMoveRight !== Moveable.No) {
                    this.setDirectionAndMoveable(Direction.Right, canMoveRight);
                }
                else {
                    this.setDirectionAndMoveable(Direction.Nothing, Moveable.No);
                }
                break;
            case MovementDirection.South:
                if (canMoveDown !== Moveable.No) {
                    this.setDirectionAndMoveable(Direction.Down, canMoveDown);
                }
                else if (canMoveLeft !== Moveable.No) {
                    this.setDirectionAndMoveable(Direction.Left, canMoveLeft);
                }
                else if (canMoveRight !== Moveable.No) {
                    this.setDirectionAndMoveable(Direction.Right, canMoveRight);
                }
                else {
                    this.setDirectionAndMoveable(Direction.Nothing, Moveable.No);
                }
                break;
            case MovementDirection.SouthEast:
                if (canMoveDown !== Moveable.No) {
                    this.setDirectionAndMoveable(Direction.Down, canMoveDown);
                }
                else if (canMoveRight !== Moveable.No) {
                    this.setDirectionAndMoveable(Direction.Right, canMoveRight);
                }
                else if (canMoveLeft !== Moveable.No) {
                    this.setDirectionAndMoveable(Direction.Left, canMoveLeft);
                }
                else {
                    this.setDirectionAndMoveable(Direction.Nothing, Moveable.No);
                }
                break;
            case MovementDirection.SouthWest:
                if (canMoveLeft !== Moveable.No) {
                    this.setDirectionAndMoveable(Direction.Left, canMoveLeft);
                }
                else if (canMoveDown !== Moveable.No) {
                    this.setDirectionAndMoveable(Direction.Down, canMoveDown);
                }
                else if (canMoveUp !== Moveable.No) {
                    this.setDirectionAndMoveable(Direction.Up, canMoveUp);
                }
                else {
                    this.setDirectionAndMoveable(Direction.Nothing, Moveable.No);
                }
                break;
            case MovementDirection.East:
                if (canMoveRight !== Moveable.No) {
                    this.setDirectionAndMoveable(Direction.Right, canMoveRight);
                }
                else if (canMoveDown !== Moveable.No) {
                    this.setDirectionAndMoveable(Direction.Down, canMoveDown);
                }
                else if (canMoveUp !== Moveable.No) {
                    this.setDirectionAndMoveable(Direction.Up, canMoveUp);
                }
                else {
                    this.setDirectionAndMoveable(Direction.Nothing, Moveable.No);
                }
                break;
            case MovementDirection.West:
                if (canMoveLeft !== Moveable.No) {
                    this.setDirectionAndMoveable(Direction.Left, canMoveLeft);
                }
                else if (canMoveUp !== Moveable.No) {
                    this.setDirectionAndMoveable(Direction.Up, canMoveUp);
                }
                else if (canMoveDown !== Moveable.No) {
                    this.setDirectionAndMoveable(Direction.Down, canMoveDown);
                }
                else {
                    this.setDirectionAndMoveable(Direction.Nothing, Moveable.No);
                }
                break;
            default: {
                this.setDirectionAndMoveable(Direction.Nothing, Moveable.No);
                break;
            }
        }
    }
    public determineNextMove(gameField: FC<{}>[][]): FC<any>[][] {
        if (this._inCage) {
            this.goOutOfCage(gameField);
        }
        else {
            if (this._isEdible) {
                this._movementDirection = this.getMovementDirectionByPositionRevert();
            }
            else {
                this._movementDirection = this.getMovementDirectionByPosition();
            }

            this.getDirectionByMovementDirection(gameField);

            this.changeCharacterPosition();
        }
        
        return this.setTemporaryGameField(gameField);
    }

    public update(subject: Subject): void {
        if (subject instanceof HackmanCharacter) {
            this._hackmanPosition = Object.assign({}, subject.position);
        }
    }
}

export default HardGhostCharacter;