import { FC } from "react";

interface IGhostAI{
    determineNextMove(gameField: FC<any>[][]):FC<any>[][];
}

export default IGhostAI;