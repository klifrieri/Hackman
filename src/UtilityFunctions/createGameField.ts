import Coin from "../Components/GamePageComponents/FieldComponents/Path/Coin";
import Empy from "../Components/GamePageComponents/FieldComponents/Path/Empty";
import Holl from "../Components/GamePageComponents/FieldComponents/HorizontalWalls/HorizontalWall";
import Hwrs from "../Components/GamePageComponents/FieldComponents/HorizontalWalls/HorizontalWallRightSideShort";
import Hwls from "../Components/GamePageComponents/FieldComponents/HorizontalWalls/HorizontalWallLeftSideShort";
import Vell from "../Components/GamePageComponents/FieldComponents/VerticalWalls/VerticalWall";
import Vwts from "../Components/GamePageComponents/FieldComponents/VerticalWalls/VerticalWallTopShort";
import Vwbs from "../Components/GamePageComponents/FieldComponents/VerticalWalls/VerticalWallBottomShort";
import Tpbo from "../Components/GamePageComponents/FieldComponents/TPieces/TPieceBottom";
import Tpto from "../Components/GamePageComponents/FieldComponents/TPieces/TPieceTop";
import Tprs from "../Components/GamePageComponents/FieldComponents/TPieces/TPieceRight";
import Tpls from "../Components/GamePageComponents/FieldComponents/TPieces/TPieceLeft";
import Colt from "../Components/GamePageComponents/FieldComponents/Corners/CornerLeftTop";
import Colb from "../Components/GamePageComponents/FieldComponents/Corners/CornerLeftBottom";
import Cort from "../Components/GamePageComponents/FieldComponents/Corners/CornerRightTop";
import Corb from "../Components/GamePageComponents/FieldComponents/Corners/CornerRightBottom";
import Snac from "../Components/GamePageComponents/FieldComponents/Path/Snack";
import Hack from "../Components/GamePageComponents/HackmanComponent/Hackman";
import Gei1 from "../Components/GamePageComponents/GhostComponents/GreenGhost";
import Gei2 from "../Components/GamePageComponents/GhostComponents/RedGhost";
import Gei3 from "../Components/GamePageComponents/GhostComponents/OrangeGhost";
import Gei4 from "../Components/GamePageComponents/GhostComponents/BlueGhost";
import React from 'react';
import Gate from "../Components/GamePageComponents/FieldComponents/Path/Gate";

const createGameField = () => {
    let fields: React.FC<any>[][] = [
        [Colt, Holl, Holl, Holl, Holl, Tpbo, Holl, Holl, Holl, Holl, Tpbo, Holl, Holl, Holl, Holl, Tpbo, Holl, Holl, Holl, Holl, Cort],
        [Vell, Snac, Coin, Coin, Coin, Vell, Coin, Coin, Coin, Coin, Vwbs, Coin, Coin, Coin, Coin, Vell, Coin, Coin, Coin, Snac, Vell],
        [Vell, Coin, Hwls, Hwrs, Coin, Vwbs, Coin, Hwls, Hwrs, Coin, Coin, Coin, Hwls, Hwrs, Coin, Vwbs, Coin, Hwls, Hwrs, Coin, Vell],
        [Vell, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Vwts, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Vell],
        [Tpls, Cort, Coin, Hwls, Holl, Holl, Holl, Hwrs, Coin, Hwls, Tpto, Hwrs, Coin, Hwls, Holl, Holl, Holl, Hwrs, Coin, Colt, Tprs],
        [Vell, Vell, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Empy, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Vell, Vell],
        [Colb, Corb, Coin, Vwts, Coin, Colt, Cort, Coin, Colt, Hwrs, Gate, Hwls, Cort, Coin, Colt, Cort, Coin, Vwts, Coin, Colb, Corb],
        [Empy, Empy, Coin, Vell, Coin, Vell, Vell, Coin, Vell, Gei1, Empy, Gei2, Vell, Coin, Vell, Vell, Coin, Vell, Coin, Empy, Empy],
        [Hwls, Hwrs, Coin, Vell, Coin, Vell, Vell, Coin, Vell, Empy, Empy, Empy, Vell, Coin, Vell, Vell, Coin, Vell, Coin, Hwls, Hwrs],
        [Empy, Empy, Coin, Vell, Coin, Vell, Vell, Coin, Vell, Gei3, Empy, Gei4, Vell, Coin, Vell, Vell, Coin, Vell, Coin, Empy, Empy],
        [Colt, Hwrs, Coin, Vwbs, Coin, Colb, Corb, Coin, Colb, Holl, Tpbo, Holl, Corb, Coin, Colb, Corb, Coin, Vwbs, Coin, Hwls, Cort],
        [Vell, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Vwbs, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Vell],
        [Vell, Coin, Hwls, Hwrs, Coin, Vwts, Coin, Hwls, Hwrs, Coin, Hack, Coin, Hwls, Hwrs, Coin, Vwts, Coin, Hwls, Hwrs, Coin, Vell],
        [Vell, Snac, Coin, Coin, Coin, Vell, Coin, Coin, Coin, Coin, Vwts, Coin, Coin, Coin, Coin, Vell, Coin, Coin, Coin, Snac, Vell],
        [Colb, Holl, Holl, Holl, Holl, Tpto, Holl, Holl, Holl, Holl, Tpto, Holl, Holl, Holl, Holl, Tpto, Holl, Holl, Holl, Holl, Corb]
    ]

    return fields.slice();
}



export default createGameField;
