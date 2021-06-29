import Coin from "./Components/Coin";
import Empy from "./Components/Empty";
import Holl from "./Components/HorizontalWalls/HorizontalWall";
import Hwrs from "./Components/HorizontalWalls/HorizontalWallRightSideShort";
import Hwls from "./Components/HorizontalWalls/HorizontalWallLeftSideShort";
import Vell from "./Components/VerticalWalls/VerticalWall";
import Vwts from "./Components/VerticalWalls/VerticalWallTopShort";
import Vwbs from "./Components/VerticalWalls/VerticalWallBottomShort";
import Tpbo from "./Components/TPieces/TPieceBottom";
import Tpto from "./Components/TPieces/TPieceTop";
import Tprs from "./Components/TPieces/TPieceRight";
import Tpls from "./Components/TPieces/TPieceLeft";
import Colt from "./Components/Corners/CornerLeftTop";
import Colb from "./Components/Corners/CornerLeftBottom";
import Cort from "./Components/Corners/CornerRightTop";
import Corb from "./Components/Corners/CornerRightBottom";
import Snac from "./Components/Snack";
import Hack from "./Components/Hackman";
import Geis from "./Components/Ghost";
import Gate from "./Components/Gate";
import React from 'react';
import EventEmitter from "events";
import Koordinate from "./Types/Koordinate";

const SpielfeldLayout = (eventEmitter: EventEmitter) => {
    let fields: React.FC<any>[][] = [
        [Colt, Holl, Holl, Holl, Holl, Tpbo, Holl, Holl, Holl, Holl, Tpbo, Holl, Holl, Holl, Holl, Tpbo, Holl, Holl, Holl, Holl, Cort],
        [Vell, Snac, Coin, Coin, Coin, Vell, Coin, Coin, Coin, Coin, Vwbs, Coin, Geis, Coin, Coin, Vell, Coin, Coin, Coin, Snac, Vell],
        [Vell, Coin, Hwls, Hwrs, Coin, Vwbs, Coin, Hwls, Hwrs, Coin, Coin, Coin, Hwls, Hwrs, Coin, Vwbs, Coin, Hwls, Hwrs, Coin, Vell],
        [Vell, Coin, Coin, Coin, Coin, Geis, Coin, Coin, Coin, Coin, Vwts, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Vell],
        [Tpls, Cort, Coin, Hwls, Holl, Holl, Holl, Hwrs, Coin, Hwls, Tpto, Hwrs, Coin, Hwls, Holl, Holl, Holl, Hwrs, Coin, Colt, Tprs],
        [Vell, Vell, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Snac, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Vell, Vell],
        [Colb, Corb, Coin, Vwts, Coin, Colt, Cort, Coin, Colt, Hwrs, Gate, Hwls, Cort, Coin, Colt, Cort, Coin, Vwts, Coin, Colb, Corb],
        [Empy, Empy, Coin, Vell, Coin, Vell, Vell, Coin, Vell, Empy, Empy, Empy, Vell, Coin, Vell, Vell, Coin, Vell, Coin, Empy, Empy],
        [Hwls, Hwrs, Coin, Vell, Coin, Vell, Vell, Coin, Vell, Empy, Empy, Empy, Vell, Coin, Vell, Vell, Geis, Vell, Coin, Hwls, Hwrs],
        [Empy, Empy, Coin, Vell, Coin, Vell, Vell, Coin, Vell, Empy, Empy, Empy, Vell, Coin, Vell, Vell, Coin, Vell, Coin, Empy, Empy],
        [Colt, Hwrs, Coin, Vwbs, Coin, Colb, Corb, Coin, Colb, Holl, Tpbo, Holl, Corb, Coin, Colb, Corb, Coin, Vwbs, Coin, Hwls, Cort],
        [Vell, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Vwbs, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Vell],
        [Vell, Geis, Hwls, Hwrs, Coin, Vwts, Coin, Hwls, Hwrs, Coin, Hack, Coin, Hwls, Hwrs, Coin, Vwts, Coin, Hwls, Hwrs, Coin, Vell],
        [Vell, Snac, Coin, Coin, Coin, Vell, Coin, Coin, Coin, Coin, Vwts, Coin, Coin, Coin, Coin, Vell, Coin, Coin, Coin, Snac, Vell],
        [Colb, Holl, Holl, Holl, Holl, Tpto, Holl, Holl, Holl, Holl, Tpto, Holl, Holl, Holl, Holl, Tpto, Holl, Holl, Holl, Holl, Corb]
    ]
    
    
    eventEmitter.addListener("bewegGeist", (i:number, ghosts:Koordinate[]) => {
        let position:Koordinate = ghosts[i];
        if(position !== undefined)
            fields[position.y][position.x] = Coin;
    })
    return fields;
}



export default SpielfeldLayout;
