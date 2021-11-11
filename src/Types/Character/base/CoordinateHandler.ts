import Coordinate from "../Coordinate";

abstract class CoordinateHandler {
    private _initialPosition: Coordinate;

    protected _position: Coordinate;
    public set positionY(value: number) {
        this._position.y = value;
    }
    public set positionX(value: number) {
        this._position.x = value;
    }
    public get positionY(): number {
        return this._position.y;
    }
    public get positionX(): number {
        return this._position.x;
    }

    constructor(positionY: number, positionX: number) {
        this._position = new Coordinate(positionY, positionX);
        this._initialPosition = new Coordinate(positionY, positionX);
    }

    public resetToStartPosition() {
        this._position.x = this._initialPosition.x;
        this._position.y = this._initialPosition.y;
    }
    public moveUp() {
        this._position.y--;
    }
    public moveRight() {
        this._position.x++;
    }
    public moveDown() {
        this._position.y++;
    }
    public movesLeft() {
        this._position.x--;
    }
    public moveRightTroughPortal() {
        this._position.x = 0;
    }
    public moveLeftTroughPortal() {
        this._position.x = 20;
    }
}
export default CoordinateHandler;